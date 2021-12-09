import client from '../../client'

const seeCategories = (_, { lastId }) =>
  client.category.findMany({
    take: 5,
    skip: lastId ? 1 : 0,
    ...(lastId && { cursor: { id: lastId } }),
  })

const resolvers = {
  Query: {
    seeCategories,
  },
}

export default resolvers
