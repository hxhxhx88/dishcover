import type { AppContext } from '@repo/api/lib/hono'
import { OpenAPIHono } from '@hono/zod-openapi'
import { handlerRefresh, routeRefresh } from './refresh'
import { handlerSignOut, routeSignOut } from './sign-out'

const api = new OpenAPIHono<AppContext>()
  .openapi(routeRefresh, handlerRefresh)
  .openapi(routeSignOut, handlerSignOut)

export { api as apiV1 }
