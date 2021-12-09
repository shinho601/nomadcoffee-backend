import { PrismaClient, User } from '@prisma/client'
import { ReadStream } from 'fs-capacitor'

type Context = {
  loggedInUser: User | null
  client: PrismaClient
}

export type Resolver = (
  root: any,
  args: any,
  context: Context,
  info: any
) => any

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver
  }
}

export interface GraphQLFileUpload {
  filename: string
  mimetype: string
  encoding: string
  createReadStream(options?: {
    encoding?: string
    highWaterMark?: number
  }): ReadStream
}
