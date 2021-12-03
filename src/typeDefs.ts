import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`)
const typeDefs = mergeTypeDefs(loadedTypes)

export default typeDefs
