import { defineConfig } from '@lingui/cli'
import { defaultLocale, locales } from './src/locales'

export default defineConfig({
  sourceLocale: defaultLocale,
  locales: [...locales],
  catalogs: [
    {
      path: '<rootDir>/locales/{locale}/messages',
      include: ['<rootDir>/../../apps/*/src/**/*', '<rootDir>/../../packages/api/src/**/*'],
      exclude: ['<rootDir>/../../apps/cli-bun/**'],
    },
  ],
  format: 'po',
  formatOptions: {
    origins: false,
  },
})
