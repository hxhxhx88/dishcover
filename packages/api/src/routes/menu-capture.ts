import { OpenAPIHono } from '@hono/zod-openapi'

const api = new OpenAPIHono()

api.post('/submit', (c) => {
  return c.json({ message: 'Not implemented' }, 501)
})

export { api as apiMenuCapture }
