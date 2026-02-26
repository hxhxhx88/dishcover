import z from 'zod'

const envSchema = z.object({
  API_ORIGIN: z.string().min(1),
  API_SECRET: z.string().min(1),
})

// Expo will replace `process.env.EXPO_PUBLIC_` to actual values.
export const env = envSchema.parse({
  API_ORIGIN: `${process.env.EXPO_PUBLIC_API_ORIGIN ?? ''}`,
  API_SECRET: `${process.env.EXPO_PUBLIC_API_SECRET ?? ''}`,
})
