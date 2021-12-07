import { Resolver, Resolvers } from '../../types'

const seeCoffeeShop: Resolver = (_, { id }, { client }) =>
  client.coffeeShop.findUnique({
    where: { id },
  })

const resolvers: Resolvers = {
  Query: {
    seeCoffeeShop,
  },
}

export default resolvers
