import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

// Environment variables for the worker process, which is usually different from the main process.
export const env = createEnv({
  server: {
    TEST_ID: z.string().min(1),
    DB_BRANCH_ID: z.string().min(1),
    DB_USERNAME: z.string().min(1),
    DB_PASSWORD: z.string().min(1),
    VERIFICATION_PRIVATE_CODE: z.string().min(1),
    API_ORIGIN: z.string().min(1).optional(),
    VERCEL_AUTOMATION_BYPASS_SECRET: z.string().optional(),
  },
  runtimeEnv: process.env,
})
