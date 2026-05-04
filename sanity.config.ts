import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './src/sanity/schemaTypes'

export default defineConfig({
  name: 'tatva-studio',
  title: 'Tatva Studio',
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'replace-me',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: schema.types,
  },
})
