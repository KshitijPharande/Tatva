import { type SchemaTypeDefinition } from 'sanity'
import { bookType } from './book'
import { articleType } from './article'
import { campaignType } from './campaign'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [bookType, articleType, campaignType],
}
