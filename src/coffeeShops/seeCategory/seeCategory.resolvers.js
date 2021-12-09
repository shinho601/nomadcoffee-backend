import client from '../../client'


const seeCategory = (_, { id }) =>
  client.category.findUnique({
    where: { id },
  })

const resolvers = {
  Query: {
    seeCategory,
  },
}

export default resolvers
