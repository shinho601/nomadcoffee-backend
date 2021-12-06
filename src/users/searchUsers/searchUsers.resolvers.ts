import { Resolver, Resolvers } from '../../types'

const searchUsers: Resolver = async (
  _,
  { keyword }: { keyword: String },
  { client }
) =>
  client.user.findMany({
    where: {
      username: {
        startsWith: keyword.toLowerCase(),
      },
    },
  })

const resolvers: Resolvers = {
  Query: {
    searchUsers,
  },
}

export default resolvers
