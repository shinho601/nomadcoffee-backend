import bcrypt from 'bcrypt'
import { Resolver, Resolvers } from '../../types'

const createAccount: Resolver = async (
  _: any,
  { username, email, name, location, avatarURL, githubUsername, password },
  { client }
) => {
  const existingUser = await client.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  })

  if (existingUser) {
    return { ok: false, error: 'This username/password is already taken.' }
  }

  const uglyPassword = await bcrypt.hash(password, 10)
  const newUser = await client.user.create({
    data: {
      username,
      email,
      name,
      location,
      avatarURL,
      githubUsername,
      password: uglyPassword,
    },
  })
  if (!newUser) {
    return { ok: false, error: 'User creation failed.' }
  }

  return { ok: true }
}

const resolvers: Resolvers = {
  Mutation: {
    createAccount: createAccount,
  },
}

export default resolvers
