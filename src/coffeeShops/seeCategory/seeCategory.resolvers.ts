import { Resolver, Resolvers } from '../../types'

const seeCategory: Resolver = (_, { id }, { client }) =>
  client.category.findUnique({
    where: { id },
  })

const resolvers: Resolvers = {
  Query: {
    seeCategory,
  },
}

export default resolvers
