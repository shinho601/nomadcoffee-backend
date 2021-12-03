require('dotenv').config()

import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import client from './client'
import schema from './schema'
import { getUser } from './users/users.utils'

const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.authorization),
      client: client
    }
  },
})

const PORT = process.env.PORT

server
  .listen(PORT)
  .then(() => console.log(`Server is running on http://localhost:${PORT}/`))
