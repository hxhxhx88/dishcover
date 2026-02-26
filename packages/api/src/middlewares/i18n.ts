import type { AppContext } from '@repo/api/lib/hono'
import { i18n } from '@repo/api/lib/i18n'
import { localeSchema } from '@repo/i18n/locales'
import { apiHeaders } from '@repo/lib/http'
import { createMiddleware } from 'hono/factory'

export const i18nMiddleware = createMiddleware<AppContext>(async (c, next) => {
  const locale = localeSchema.catch('en-us').parse(c.req.header(apiHeaders.acceptLanguage))
  i18n.activate(locale)
  c.set('locale', locale)
  return next()
})
