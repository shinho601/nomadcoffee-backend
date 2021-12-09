import { gql } from 'apollo-server-core'

export default gql`
  type Query {
    dummy: String
  }
  type Mutation {
    createCoffeeShop(
      name: String!
      latitude: String!
      longitude: String!
      photos: [Upload]
      category: String!
    ): MutationResult!
  }
`
