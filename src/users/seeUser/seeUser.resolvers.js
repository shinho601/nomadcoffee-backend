import client from '../../client'

const seeUser = (_, { username }) =>
  client.user.findUnique({
    where: { username },
  })

const resolvers = {
  Query: {
    seeUser: seeUser,
  },
}

export default resolvers
