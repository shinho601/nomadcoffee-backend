import { gql } from 'apollo-server-core'

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String!
    location: String
    avatarURL: String
    githubUsername: String
    following(lastId: Int): [User]
    followers(lastId: Int): [User]
    createdAt: String!
    updatedAt: String!
  }
`
