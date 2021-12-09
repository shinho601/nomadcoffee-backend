require('dotenv').config()

import express from 'express'
import logger from 'morgan'
import { ApolloServer } from 'apollo-server-express'
import { graphqlUploadExpress } from 'graphql-upload'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import client from './client'
// import { typeDefs, resolvers } from './schema'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import { getUser } from './users/users.utils'

async function startServer() {
  const app = express()
  const PORT = process.env.PORT

  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    // uploads: false,
    // playground: true,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.authorization),
        client: client,
      }
    },
  })
  await apollo.start()

  app.use(logger('tiny'))
  app.use(graphqlUploadExpress())
  app.use('/static', express.static('uploads'))
  apollo.applyMiddleware({ app })

  app.listen({ port: PORT }, () => {
    console.log(
      `🚀Server is running on http://localhost:${PORT}${apollo.graphqlPath} ✅`
    )
  })
}

startServer()
