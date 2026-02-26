import type { hc } from 'hono/client'
import { OpenAPIHono } from '@hono/zod-openapi'
import { versionMiddleware } from '@repo/api/middlewares/version'
import { authMiddleware } from './middlewares/auth'
import { dbMiddleware } from './middlewares/db'
import { i18nMiddleware } from './middlewares/i18n'
import { apiConfig } from './routes/config'

const openApi = new OpenAPIHono()

openApi.doc('/doc', {
  openapi: '3.0.0',
  info: { title: 'API', version: '1' },
})

export const api = openApi
  .get('/', c => c.text('Welcome!'))
  .use('*', dbMiddleware)
  .use('*', i18nMiddleware)
  .use('*', authMiddleware)
  .route('/config', apiConfig) // <- this endpoint does not check version
  .use('*', versionMiddleware)

export type ApiType = typeof api
export type ApiClient = ReturnType<typeof hc<ApiType>>
