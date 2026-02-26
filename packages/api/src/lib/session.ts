import { jwtVerify, SignJWT } from 'jose'
import { z } from 'zod'
import { env } from './env'

const sessionIdentitySchema = z.object({
  userId: z.string(),
  sessionId: z.string(),
})

export const accessSessionSchema = sessionIdentitySchema.extend({
  tokenType: z.literal('access'),
})

export const refreshSessionSchema = sessionIdentitySchema.extend({
  tokenType: z.literal('refresh'),
})

export type SessionIdentity = z.infer<typeof sessionIdentitySchema>
export type AccessSession = z.infer<typeof accessSessionSchema>
export type RefreshSession = z.infer<typeof refreshSessionSchema>

const key = new TextEncoder().encode(env.JWT_SECRET)

export function makeRefreshExpiresAt(now = new Date()): Date {
  const days = env.REFRESH_TOKEN_TTL_DAYS
  return new Date(now.getTime() + days * 24 * 60 * 60 * 1000)
}

async function encodeToken(payload: AccessSession | RefreshSession, expiresIn: string): Promise<string> {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(key)

  return token
}

export async function encodeAccessSession(session: SessionIdentity): Promise<string> {
  return encodeToken({ ...session, tokenType: 'access' }, `${env.ACCESS_TOKEN_TTL_MINUTES}m`)
}

export async function encodeRefreshSession(session: SessionIdentity): Promise<string> {
  return encodeToken({ ...session, tokenType: 'refresh' }, `${env.REFRESH_TOKEN_TTL_DAYS}d`)
}

async function decodeToken<T extends z.ZodType>(
  token: string,
  schema: T,
): Promise<z.infer<T> | undefined> {
  try {
    const { payload } = await jwtVerify(token, key)
    return schema.safeParse(payload).data
  }
  catch {
    return undefined
  }
}

export async function decodeAccessSession(token: string): Promise<AccessSession | undefined> {
  return decodeToken(token, accessSessionSchema)
}

export async function decodeRefreshSession(token: string): Promise<RefreshSession | undefined> {
  return decodeToken(token, refreshSessionSchema)
}
