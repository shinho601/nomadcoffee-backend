import { gql } from 'apollo-server-core'

export default gql`
  type createAcountResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createAccount(
      username: String!
      email: String!
      name: String!
      location: String
      avatarURL: String
      githubUsername: String
      password: String!
    ): createAcountResult!
  }
`
