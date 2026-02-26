import type { AppContext } from '@repo/api/lib/hono'
import { env } from '@repo/api/lib/env'
import { newDatabase } from '@repo/db'
import { apiHeaders } from '@repo/lib/http'
import { createMiddleware } from 'hono/factory'

export const dbMiddleware = createMiddleware<AppContext>(async (c, next) => {
  const connStr = c.req.header(apiHeaders.database) || env.DATABASE_URL
  const db = newDatabase(connStr)
  c.set('db', db)
  return next()
})
