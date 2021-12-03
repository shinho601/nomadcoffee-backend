import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Resolver, Resolvers } from '../../types'

const login: Resolver = async (_: any, { username, password }, { client }) => {
  const user = await client.user.findFirst({ where: { username } })
  if (!user) {
    return {
      ok: false,
      error: 'User not found.',
    }
  }
  const passwordOk = await bcrypt.compare(password, user.password)
  if (!passwordOk) {
    return {
      ok: false,
      error: 'Incorrect password.',
    }
  }
  const secretKey = process.env.SECRET_KEY || ''
  const token = await jwt.sign({ id: user.id }, secretKey)
  return {
    ok: true,
    token,
  }
}

const resolvers: Resolvers = {
  Mutation: {
    login: login,
  },
}

export default resolvers
