import type { RouteHandler } from '@hono/zod-openapi'
import type { AppContext } from '@repo/api/lib/hono'
import { createRoute, z } from '@hono/zod-openapi'
import {
  decodeRefreshSession,
  encodeAccessSession,
  encodeRefreshSession,
  makeRefreshExpiresAt,
} from '@repo/api/lib/session'

const requestSchema = z.object({
  refreshToken: z.string(),
})

const responseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
})

const route = createRoute({
  method: 'post',
  path: '/refresh',
  request: {
    body: {
      required: true,
      content: { 'application/json': { schema: requestSchema } },
    },
  },
  responses: {
    200: {
      description: '',
      content: { 'application/json': { schema: responseSchema } },
    },
    401: {
      description: '',
    },
  },
})

type Handler = RouteHandler<typeof route, AppContext>

const handler: Handler = async (c) => {
  const { db } = c.var
  const { refreshToken } = c.req.valid('json')
  const session = await decodeRefreshSession(refreshToken)
  if (!session) {
    return c.text('invalid refresh token', 401)
  }

  const { sessionId, userId } = session
  const now = new Date()
  const newSession = await db.$transaction(async (tx) => {
    const deleted = await tx.session.deleteMany({
      where: {
        id: sessionId,
        userId,
        expiresAt: { gt: now },
      },
    })
    if (deleted.count !== 1) {
      return
    }

    return tx.session.create({
      data: {
        userId,
        expiresAt: makeRefreshExpiresAt(now),
      },
      select: { id: true },
    })
  })

  if (!newSession) {
    return c.text('invalid refresh token', 401)
  }

  const { id: nextSessionId } = newSession
  const [accessToken, nextRefreshToken] = await Promise.all([
    encodeAccessSession({ userId, sessionId: nextSessionId }),
    encodeRefreshSession({ userId, sessionId: nextSessionId }),
  ])

  return c.json({ accessToken, refreshToken: nextRefreshToken }, 200)
}

export { handler as handlerRefresh, route as routeRefresh }
