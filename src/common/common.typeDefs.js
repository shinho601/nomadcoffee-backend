import { gql } from 'apollo-server-core'

export default gql`
  type MutationResult {
    ok: Boolean!
    error: String
  }
  type LoginResponse {
    ok: Boolean!
    error: String
    token: String
  }
`
