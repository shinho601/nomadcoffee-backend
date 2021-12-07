import { gql } from 'apollo-server-core'

export default gql`
  type createCoffeeShopResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createCoffeeShop(
      name: String!
      latitude: String!
      longitude: String!
      photos: [Upload]
      category: String!
    ): createAcountResult!
  }
`
