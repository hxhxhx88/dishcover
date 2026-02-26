import { defineConfig } from 'orval'

export default defineConfig({
  api: {
    input: 'http://localhost:3000/api/doc',
    output: {
      target: 'apps/app-mobile/src/generated/api-client.ts',
      client: 'react-query',
      httpClient: 'axios',
    },
  },
})
