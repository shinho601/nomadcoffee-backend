import client from '../../client'


const searchUsers = async (
  _,
  { keyword }
) =>
  client.user.findMany({
    where: {
      username: {
        startsWith: keyword.toLowerCase(),
      },
    },
  })

const resolvers = {
  Query: {
    searchUsers,
  },
}

export default resolvers
