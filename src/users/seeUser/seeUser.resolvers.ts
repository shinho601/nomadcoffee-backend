import { Resolver, Resolvers } from '../../types.d'

const seeUser: Resolver = (_: any, { username }, { client }) =>
  client.user.findUnique({
    where: { username },
  })

const resolvers: Resolvers = {
  Query: {
    seeUser: seeUser,
  },
}

export default resolvers
