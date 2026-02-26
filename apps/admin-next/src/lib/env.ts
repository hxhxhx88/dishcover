import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    ADMIN_BASIC_AUTH_USERNAME: z.string().min(1),
    ADMIN_BASIC_AUTH_PASSWORD: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    ADMIN_BASIC_AUTH_USERNAME: process.env.ADMIN_BASIC_AUTH_USERNAME,
    ADMIN_BASIC_AUTH_PASSWORD: process.env.ADMIN_BASIC_AUTH_PASSWORD,
  },
})
