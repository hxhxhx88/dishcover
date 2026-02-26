import type { RouteHandler } from '@hono/zod-openapi'
import type { AppContext } from '@repo/api/lib/hono'
import { createRoute, z } from '@hono/zod-openapi'
import { env } from '@repo/api/lib/env'

const route = createRoute({
  method: 'get',
  path: '/',
  responses: {
    200: {
      description: '',
      content: {
        'application/json': {
          schema: z.object({
            storeIdIos: z.string(),
            storeIdAndroid: z.string(),
          }),
        },
      },
    },
  },
})

type Handler = RouteHandler<typeof route, AppContext>

const handler: Handler = async (c) => {
  return c.json(
    {
      storeIdIos: env.STORE_ID_IOS,
      storeIdAndroid: env.STORE_ID_ANDROID,
    },
    200,
  )
}

export { handler as handlerRead, route as routeRead }
