import bcrypt from 'bcrypt'
import client from '../../client'

const createAccount = async (
  _,
  { username, email, name, location, avatarURL, githubUsername, password }
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

const resolvers = {
  Mutation: {
    createAccount: createAccount,
  },
}

export default resolvers
