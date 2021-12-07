import { Resolver } from '../types'

const user: Resolver = ({ id }, _, { client }) =>
  client.user.findFirst({
    where: {
      coffeeShop: {
        some: { id },
      },
    },
  })

const categories: Resolver = ({ id }, { lastId }, { client }) =>
  client.coffeeShop
    .findUnique({
      where: { id },
    })
    .categories({
      take: 5,
      skip: lastId ? 1 : 0,
      ...(lastId && { cursor: { id: lastId } }),
    })

const photos: Resolver = ({ id }, { lastId }, { client }) =>
  client.coffeeShop
    .findUnique({
      where: { id },
    })
    .photos({
      take: 5,
      skip: lastId ? 1 : 0,
      ...(lastId && { cursor: { id: lastId } }),
    })

const shops: Resolver = ({ id }, { lastId }, { client }) =>
  client.category
    .findUnique({
      where: { id },
    })
    .shops({
      take: 5,
      skip: lastId ? 1 : 0,
      ...(lastId && { cursor: { id: lastId } }),
    })

const totalShops: Resolver = ({ id }, _, { client }) =>
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
