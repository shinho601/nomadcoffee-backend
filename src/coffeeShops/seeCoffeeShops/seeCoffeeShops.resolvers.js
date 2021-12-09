import client from '../../client'


const seeCoffeeShops = (_, { lastId }) =>
  client.coffeeShop.findMany({
    take: 10,
    skip: lastId ? 1 : 0,
    ...(lastId && { cursor: { id: lastId } }),
  })

const resolvers = {
  Query: {
    seeCoffeeShops,
  },
}

export default resolvers
