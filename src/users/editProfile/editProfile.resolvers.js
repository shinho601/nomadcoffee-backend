import bcrypt from 'bcrypt'
import { protectedResolver } from '../users.utils'
import client from '../../client'

import { createWriteStream } from 'fs'

const editProfile = async (
  _,
  {
    username,
    password: newPassword,
    email,
    name,
    location,
    githubUsername,
    avatar,
  },
  { loggedInUser }
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

const resolvers = {
  Mutation: {
    editProfile: protectedResolver(editProfile),
  },
}

export default resolvers
