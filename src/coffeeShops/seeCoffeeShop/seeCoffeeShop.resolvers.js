import client from '../../client'


const seeCoffeeShop = (_, { id }) =>
  client.coffeeShop.findUnique({
    where: { id },
  })

const resolvers = {
  Query: {
    seeCoffeeShop,
  },
}

export default resolvers
