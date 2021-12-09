import client from '../client'


const user = ({ id }, _) =>
  client.user.findFirst({
    where: {
      coffeeShop: {
        some: { id },
      },
    },
  })

const categories = ({ id }, { lastId }) =>
  client.coffeeShop
    .findUnique({
      where: { id },
    })
    .categories({
      take: 5,
      skip: lastId ? 1 : 0,
      ...(lastId && { cursor: { id: lastId } }),
    })

const photos = ({ id }, { lastId }) =>
  client.coffeeShop
    .findUnique({
      where: { id },
    })
    .photos({
      take: 5,
      skip: lastId ? 1 : 0,
      ...(lastId && { cursor: { id: lastId } }),
    })

const shops = ({ id }, { lastId }) =>
  client.category
    .findUnique({
      where: { id },
    })
    .shops({
      take: 5,
      skip: lastId ? 1 : 0,
      ...(lastId && { cursor: { id: lastId } }),
    })

const totalShops = ({ id }, _) =>
  client.coffeeShop.count({
    where: {
      categories: {
        some: {
          id,
        },
      },
    },
  })

export default {
  CoffeeShop: {
    user,
    categories,
    photos,
  },
  Category: {
    shops,
    totalShops,
  },
}
