import { User } from '.prisma/client'
import jwt from 'jsonwebtoken'
import client from '../client'
import { Resolver } from '../types'
// import { Context, Resolver } from "./../types.d";

export const getUser = async (token: string | undefined) => {
  try {
    if (!token) {
      return null
    }
    let isJWTValid = false
    const secretKey = process.env.SECRET_KEY || ''

    jwt.verify(token, secretKey, (error, data) => {
      if (error) {
        return
      }
      isJWTValid = true
    })

    if (!isJWTValid) {
      return null
    }

    const decodedToken = jwt.decode(token) as { id: number }
    const { id } = decodedToken

    const user = await client.user.findUnique({ where: { id } })
    if (user) {
      return user
    } else {
      return null
    }
  } catch {
    return null
  }
}

export const protectedResolver =
  (resolverFn: Resolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: 'Please log in to perform this action.',
      }
    }
    return resolverFn(root, args, context, info)
  }
