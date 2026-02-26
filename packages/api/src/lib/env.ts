import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    // Database
    DATABASE_URL: z.string().min(1),
    // App
    API_SECRET: z.string().min(1),
    MIN_CLIENT_VERSION: z.string().min(1),
    // App Store
    STORE_ID_IOS: z.string().min(1),
    STORE_ID_ANDROID: z.string().min(1),
    // Dev
    DEV_ALLOW_DATABASE_SWITCH: z.boolean().default(false),
  },
  runtimeEnv: process.env,
})
