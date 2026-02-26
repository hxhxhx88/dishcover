import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DEV_DEVICE_IOS: z.string().min(1),
    DEV_DEVICE_ANDROID: z.string().min(1),
    DEV_VERIFICATION_PRIVATE_CODE: z.string().min(1),
    NEON_API_KEY: z.string().min(1),
    NEON_PROJECT_ID_TEST: z.string().min(1),
  },
  runtimeEnv: process.env,
})
