import client from '../../client'

const seeProfile = (_, { username }) =>
  client.user.findUnique({
    where: { username },
    include: { following: true, followers: true },
  })

const resolvers = {
  Query: {
    seeProfile: seeProfile,
  },
}

export default resolvers
