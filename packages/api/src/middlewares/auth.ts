import type { AppContext } from '@repo/api/lib/hono'
import { env } from '@repo/api/lib/env'
import { i18n } from '@repo/api/lib/i18n'
import { decodeAccessSession } from '@repo/api/lib/session'
import { localeSchema } from '@repo/i18n/locales'
import { apiHeaders, apiSignatureMessage } from '@repo/lib/http'
import { HmacSHA256 as hmacSHA256 } from 'crypto-js'
import { createMiddleware } from 'hono/factory'

export const authMiddleware = createMiddleware<AppContext>(async (c, next) => {
  const { db } = c.var

  const locale = localeSchema.catch('en-us').parse(c.req.header(apiHeaders.acceptLanguage))
  i18n.activate(locale)

  // verify signature
  const timestamp = c.req.header(apiHeaders.timestamp)
  const signature = c.req.header(apiHeaders.signature)
  if (!timestamp || !signature) {
    return c.text('missing signature headers', 401)
  }

  const timeDifference = Date.now() - Number.parseInt(timestamp, 10)
  if (Math.abs(timeDifference) > 5 * 60 * 1000) {
    // expired
    return c.text('signature expired', 401)
  }

  const messageToSign = apiSignatureMessage(`${c.req.path}`, timestamp)
  const expectedSignature = hmacSHA256(messageToSign, env.API_SECRET).toString()

  if (signature !== expectedSignature) {
    return c.text('invalid signature', 401)
  }

  const accessToken = c.req.header(apiHeaders.accessToken)

  if (accessToken) {
    const session = await decodeAccessSession(accessToken)
    if (!session) {
      return c.text('invalid session token', 401)
    }

    const { sessionId, userId } = session
    const sess = await db.session.findUnique({
      where: { id: sessionId },
      select: { userId: true, expiresAt: true },
    })
    const isInvalid = !sess || sess.userId !== userId || sess.expiresAt < new Date()
    if (isInvalid) {
      return c.text('invalid session token', 401)
    }

    c.set('session', session)
  }

  c.set('locale', locale)

  const timeZone = c.req.header(apiHeaders.timeZone)
  if (timeZone) {
    c.set('timeZone', timeZone)
  }

  return next()
})
