import { gql } from 'apollo-server'

export default gql`
  type Query {
    dummy: String
  }
  type Mutation {
    unfollowUser(username: String!): MutationResult!
  }
`
