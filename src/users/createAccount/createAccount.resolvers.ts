import bcrypt from 'bcrypt'
import { Resolver, Resolvers } from '../../types'

const createAccount: Resolver = async (
  _: any,
  { username, email, name, location, avatarURL, githubUsername, password },
  { client }
) => {
  try {
    const existingUser = await client.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    })

    if (existingUser) {
      throw new Error('This username/password is already taken.')
    }

    const uglyPassword = await bcrypt.hash(password, 10)
    const newUser = client.user.create({
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
    return { ok: true, user: newUser }
  } catch (e: any) {
    return { ok: false, error: e.message }
  }
}

const resolvers: Resolvers = {
  Mutation: {
    createAccount: createAccount,
  },
}

export default resolvers
