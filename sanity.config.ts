import {defineConfig, ConfigContext, getConfigContextFromSource, useCurrentUser} from 'sanity'
import {CogIcon} from '@sanity/icons'
import {structureTool, StructureBuilder} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'demo',

  projectId: '46b4kxer',
  dataset: 'production',

  plugins: [visionTool(), structureTool()],

  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev,
      {
        icon: CogIcon,
        id: 'admin-user',
        title: 'Admin',
        schemaType: 'user',
        value: {
          role: 'admin'
        },
      },
      // {
      //   id: 'post-user',
      //   title: 'Post-User',
      //   schemaType: 'post',
      //   value: {
      //     user: useCurrentUser()
      //   }
      // }
    ],
  },
})