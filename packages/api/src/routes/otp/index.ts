import { OpenAPIHono } from '@hono/zod-openapi'
import { apiV1 } from './v1'

const api = new OpenAPIHono().route('/v1', apiV1)

export { api as apiOtp }
