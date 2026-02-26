import type { RouteHandler } from '@hono/zod-openapi'
import type { AppContext } from '@repo/api/lib/hono'
import { createRoute } from '@hono/zod-openapi'
import { HTTPException } from 'hono/http-exception'

const route = createRoute({
  method: 'post',
  path: '/sign-out',
  responses: {
    200: {
      description: '',
    },
  },
})

type Handler = RouteHandler<typeof route, AppContext>

const handler: Handler = async (c) => {
  const { db, session } = c.var
  if (!session) {
    throw new HTTPException(403)
  }

  const { sessionId, userId } = session
  await db.session.deleteMany({
    where: {
      id: sessionId,
      userId,
    },
  })

  return c.json({}, 200)
}

export { handler as handlerSignOut, route as routeSignOut }
