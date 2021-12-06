import { Resolver, Resolvers } from '../types'

const totalFollowing: Resolver = ({ id }, _, { client }) =>
  client.user.count({
    where: {
      followers: {
        some: { id },
      },
    },
  })

const totalFollowers: Resolver = ({ id }, _, { client }) =>
  client.user.count({
    where: {
      following: {
        some: { id },
      },
    },
  })

const isMe: Resolver = ({ id }, _, { loggedInUser }) => {
  if (!loggedInUser) {
    return false
  }
  return id === loggedInUser.id
}

const isFollowing: Resolver = async ({ id }, _, { loggedInUser, client }) => {
  if (!loggedInUser) {
    return false
  }
  const exists = await client.user.count({
    where: {
      username: loggedInUser.username,
      following: {
        some: {
          id,
        },
      },
    },
  })
  return Boolean(exists)
}

export default {
  User: {
    totalFollowing,
    totalFollowers,
    isMe,
    isFollowing,
  },
}
