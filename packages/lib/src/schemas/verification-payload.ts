import z from 'zod'

export const verificationPayloadSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('sign-in'),
    email: z.string(),
  }),
])

export type VerificationPayload = z.infer<typeof verificationPayloadSchema>
