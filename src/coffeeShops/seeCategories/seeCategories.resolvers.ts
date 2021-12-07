import { Resolver, Resolvers } from '../../types'

const seeCategories: Resolver = (_, { lastId }, { client }) =>
  client.category.findMany({
    take: 5,
    skip: lastId ? 1 : 0,
    ...(lastId && { cursor: { id: lastId } }),
  })

const resolvers: Resolvers = {
  Query: {
    seeCategories,
  },
}

export default resolvers
