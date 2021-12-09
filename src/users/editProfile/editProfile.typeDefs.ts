import { gql } from 'apollo-server'

export default gql`
  type Mutation {
    editProfile(
      username: String
      password: String
      email: String
      name: String
      location: String
      githubUsername: String
      avatar: Upload
    ): MutationResult!
  }
  type Query {
    dummy: String
  }
`
