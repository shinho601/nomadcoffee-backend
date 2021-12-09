import { protectedResolver } from '../../users/users.utils'
import client from '../../client'
import { createWriteStream } from 'fs'
import { parseCategory } from '../coffeeShops.utils'

const editCoffeeShop = async (
  _,
  { id, name, latitude, longitude, photos, category },
  { loggedInUser }
) => {
  const shop = await client.coffeeShop.findUnique({
    where: { id },
    include: {
      categories: {
        select: {
          id: true,
        },
      },
    },
  })

  if (!shop) {
    return {
      ok: false,
      error: 'No coffeeshop found!',
    }
  }

  const categoryObj = parseCategory(category)

  await client.coffeeShop.update({
    where: { id },
    data: {
      name,
      latitude,
      longitude,
      ...(categoryObj.length > 0 && {
        categories: {
          disconnect: shop.categories,
          connectOrCreate: categoryObj,
        },
      }),
    },
  })

  if (photos) {
    photos.forEach(async (photo) => {
      const {
        file: { filename, createReadStream },
      } = await photo
      const newFilename = `coffeeshop-${
        loggedInUser.id
      }-${Date.now()}-${filename}`
      const readStream = createReadStream()
      const writeStream = createWriteStream(
        process.cwd() + '/uploads/' + newFilename
      )
      readStream.pipe(writeStream)
      const url = `http://localhost:4000/static/${newFilename}`

      await client.coffeeShopPhoto.create({
        data: {
          url,
          shop: {
            connect: {
              id: shop.id,
            },
          },
        },
      })
    })
  }
}

const resolvers = {
  Mutation: {
    editCoffeeShop: protectedResolver(editCoffeeShop),
  },
}

export default resolvers
