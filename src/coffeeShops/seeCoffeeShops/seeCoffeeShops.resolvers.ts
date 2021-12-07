import { Resolver, Resolvers } from '../../types'

const seeCoffeeShops: Resolver = (_, { lastId }, { client }) =>
  client.coffeeShop.findMany({
    take: 10,
    skip: lastId ? 1 : 0,
    ...(lastId && { cursor: { id: lastId } }),
  })

const resolvers: Resolvers = {
  Query: {
    seeCoffeeShops,
  },
}

export default resolvers
