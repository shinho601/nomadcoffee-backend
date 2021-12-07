import { Resolver, Resolvers } from '../../types'
import { protectedResolver } from '../../users/users.utils'
import { createWriteStream } from 'fs'

const parseCategory = (category: string) => {
  let categoryObj = []
  if (category) {
    const categories = category.match(/#[\w]+/g)
    categoryObj = categories.map((element) => ({
      where: { name: element },
      create: { name: element, slug: element },
    }))
  }
  return categoryObj
}

const createCoffeeShop: Resolver = async (
  _: any,
  { name, latitude, longitude, photos, category },
  { loggedInUser, client }
) => {
  const existing = await client.coffeeShop.findFirst({
    where: {
      name,
    },
  })

  if (existing) {
    return { ok: false, error: 'This name is already taken.' }
  }

  const categoryObj = parseCategory(category)

  const newCoffeeShop = await client.coffeeShop.create({
    data: {
      name,
      latitude,
      longitude,
      user: {
        connect: {
          id: loggedInUser.id,
        },
      },
      ...(categoryObj.length > 0 && {
        categories: {
          connectOrCreate: categoryObj,
        },
      }),
    },
  })

  console.log(newCoffeeShop)

  let photosObj = []
  console.log(photos)

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
              id: newCoffeeShop.id,
            },
          },
        },
      })
    })
  }

  return { ok: true }
}

const resolvers: Resolvers = {
  Mutation: {
    createCoffeeShop: protectedResolver(createCoffeeShop),
  },
}

export default resolvers