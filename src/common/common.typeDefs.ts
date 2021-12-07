import { gql } from 'apollo-server-core'

export default gql`
  scalar Upload
  type MutationResult {
    ok: Boolean!
    error: String
  }
`
