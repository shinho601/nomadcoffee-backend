import bcrypt from 'bcrypt'
import { protectedResolver } from '../users.utils'
import { Resolver, Resolvers } from '../../types'
import { createWriteStream } from 'fs'

const editProfile: Resolver = async (
  _: any,
  {
    username,
    password: newPassword,
    email,
    name,
    location,
    githubUsername,
    avatar,
  },
  { loggedInUser, client }
) => {
  let avatarURL = null
  if (avatar) {
    const {
      file: { filename, createReadStream },
    } = await avatar
    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`
    const readStream = createReadStream()
    const writeStream = createWriteStream(
      process.cwd() + '/uploads/' + newFilename
    )
    readStream.pipe(writeStream)
    avatarURL = `http://localhost:4000/static/${newFilename}`
  }

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
      ...(avatarURL && { avatarURL }),
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
