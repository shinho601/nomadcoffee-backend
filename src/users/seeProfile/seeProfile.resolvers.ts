import { Resolver, Resolvers } from '../../types.d'

const seeProfile: Resolver = (_: any, { username }, { client }) =>
  client.user.findUnique({ where: { username } })

const resolvers: Resolvers = {
  Query: {
    seeProfile: seeProfile,
  },
}

export default resolvers
