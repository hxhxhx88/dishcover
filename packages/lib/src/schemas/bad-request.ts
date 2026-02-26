import z from 'zod'

export const badRequestSchema = z.object({
  message: z.string(),
})
