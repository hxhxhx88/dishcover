import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    // Database
    DATABASE_URL: z.string().min(1),
    // App
    JWT_SECRET: z.string().min(1),
    API_SECRET: z.string().min(1),
    MIN_CLIENT_VERSION: z.string().min(1),
    ACCESS_TOKEN_TTL_MINUTES: z.coerce.number().int().positive().default(15),
    REFRESH_TOKEN_TTL_DAYS: z.coerce.number().int().positive().default(30),
    // Email
    EMAIL_SENDER: z.email(),
    POSTMARK_API_KEY: z.string().min(1),
    POSTMARK_MESSAGE_STREAM: z.string().min(1),
    // App Store
    STORE_ID_IOS: z.string().min(1),
    STORE_ID_ANDROID: z.string().min(1),
    // Dev
    DEV_VERIFICATION_PRIVATE_CODE: z.string().optional(),
    DEV_TESTER_EMAILS: z.string().optional(),
    DEV_ALLOW_DATABASE_SWITCH: z.boolean().default(false),
  },
  runtimeEnv: process.env,
})
