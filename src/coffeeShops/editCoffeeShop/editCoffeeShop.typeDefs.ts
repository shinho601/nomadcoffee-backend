import { gql } from 'apollo-server'

export default gql`
  type Query {
    dummy: String
  }
  type Mutation {
    editCoffeeShop(
      id: Int!
      name: String
      latitude: String
      longitude: String
      photos: [Upload]
      category: String
    ): MutationResult!
  }
`
