import type { AppContext } from '@repo/api/lib/hono'
import { env } from '@repo/api/lib/env'
import { apiHeaders } from '@repo/lib/http'
import { compareVersions } from 'compare-versions'
import { createMiddleware } from 'hono/factory'

export const versionMiddleware = createMiddleware<AppContext>(async (c, next) => {
  // check version
  const version = c.req.header(apiHeaders.version)
  if (!version) {
    return c.text('missing version header', 401)
  }

  if (compareVersions(version, env.MIN_CLIENT_VERSION) < 0) {
    return c.text('client outdated', 426)
  }

  return next()
})
