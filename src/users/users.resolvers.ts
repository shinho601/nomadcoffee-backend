import { Resolver } from '../types'

const following: Resolver = ({ id }, { lastId }, { client }) =>
  client.user.findUnique({ where: { id } }).following({
    take: 5,
    skip: lastId ? 1 : 0,
    ...(lastId && { cursor: { id: lastId } }),
  })

const followers: Resolver = ({ id }, { lastId }, { client }) =>
  client.user.findUnique({ where: { id } }).followers({
    take: 5,
    skip: lastId ? 1 : 0,
    ...(lastId && { cursor: { id: lastId } }),
  })

export default {
  User: {
    following,
    followers,
  },
}
