import bcrypt from 'bcrypt'
import { protectedResolver } from '../users.utils'
import { Resolver, Resolvers } from '../../types'

const editProfile: Resolver = async (
  _: any,
  {
    username,
    password: newPassword,
    email,
    name,
    location,
    avatarURL,
    githubUsername,
  },
  { loggedInUser, client }
) => {
  let uglyPassword = null
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10)
  }
  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      username,
      email,
      name,
      location,
      avatarURL,
      githubUsername,
      ...(uglyPassword && { password: uglyPassword }),
    },
  })
  if (updatedUser.id) {
    return {
      ok: true,
    }
  } else {
    return {
      ok: false,
      error: 'Could not update profile.',
    }
  }
}

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(editProfile),
  },
}

export default resolvers
