import { defineConfig } from '@lingui/cli'
import { defaultLocale, locales } from '@repo/i18n/locales'

export default defineConfig({
  sourceLocale: defaultLocale,
  locales: [...locales],
  catalogs: [
    {
      path: '../../packages/i18n/locales/{locale}/messages',
      include: [],
    },
  ],
})
