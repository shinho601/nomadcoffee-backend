import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeResolvers } from '@graphql-tools/merge'

const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.ts`)
const resolvers = mergeResolvers(loadedResolvers)

export default resolvers
