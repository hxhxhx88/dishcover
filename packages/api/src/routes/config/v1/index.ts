import type { AppContext } from '@repo/api/lib/hono'
import { OpenAPIHono } from '@hono/zod-openapi'
import { handlerRead, routeRead } from './read'

const api = new OpenAPIHono<AppContext>().openapi(routeRead, handlerRead)

export { api as apiV1 }
