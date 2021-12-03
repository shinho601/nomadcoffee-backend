import { gql } from 'apollo-server'

export default gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      username: String
      password: String
      email: String
      name: String
      location: String
      githubUsername: String
      avatar: Upload
    ): EditProfileResult!
  }
`
