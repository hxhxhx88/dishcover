import type { AppContext } from '@repo/api/lib/hono'
import { OpenAPIHono } from '@hono/zod-openapi'
import { handlerSend, routeSend } from './send'
import { handlerVerifySignIn, routeVerifySignIn } from './verify-sign-in'

const api = new OpenAPIHono<AppContext>()
  .openapi(routeSend, handlerSend)
  .openapi(routeVerifySignIn, handlerVerifySignIn)

export { api as apiV1 }
