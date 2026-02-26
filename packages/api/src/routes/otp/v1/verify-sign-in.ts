import type { RouteHandler } from '@hono/zod-openapi'
import type { AppContext } from '@repo/api/lib/hono'
import type { PrismaClient } from '@repo/db'
import type { VerificationPayload } from '@repo/lib/schemas/verification-payload'
import { createRoute, z } from '@hono/zod-openapi'
import { t } from '@lingui/core/macro'
import { encodeAccessSession, encodeRefreshSession, makeRefreshExpiresAt } from '@repo/api/lib/session'
import { badRequestSchema } from '@repo/lib/schemas/bad-request'
import { verificationPayloadSchema } from '@repo/lib/schemas/verification-payload'

const requestSchema = z.object({
  publicCode: z.string(),
  privateCode: z.string(),
})

type RequestType = z.infer<typeof requestSchema>

const responseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
})

const route = createRoute({
  method: 'post',
  path: '/verify-sign-in',
  request: {
    body: {
      required: true,
      content: { 'application/json': { schema: requestSchema } },
    },
  },
  responses: {
    200: {
      description: '',
      content: { 'application/json': { schema: responseSchema } },
    },
    400: {
      description: '',
      content: { 'application/json': { schema: badRequestSchema } },
    },
  },
})

type Handler = RouteHandler<typeof route, AppContext>

interface VerifyInput extends RequestType {
  db: PrismaClient
}

async function verify({
  db,
  publicCode,
  privateCode,
}: VerifyInput): Promise<Extract<VerificationPayload, { type: 'sign-in' }> | undefined> {
  const verification = await db.verification.findUnique({
    where: { id: publicCode },
    select: { privateCode: true, payloadJson: true, expiresAt: true },
  })

  if (!verification) {
    return
  }

  const { privateCode: truePrivateCode, payloadJson, expiresAt } = verification
  if (truePrivateCode !== privateCode) {
    return
  }

  if (expiresAt < new Date()) {
    return
  }

  const payload = verificationPayloadSchema.parse(JSON.parse(payloadJson))
  if (payload.type !== 'sign-in') {
    return
  }

  return payload
}

const handler: Handler = async (c) => {
  const { db } = c.var
  const { publicCode, privateCode } = c.req.valid('json')

  const payload = await verify({ db, publicCode, privateCode })
  if (!payload) {
    return c.json({ message: t`The code is incorrect or expired.` }, 400)
  }

  // delete the code
  await db.verification.delete({
    where: { id: publicCode },
  })

  // upsert a user
  const { email } = payload
  const { id: userId } = await db.user.upsert({
    where: { email },
    update: {},
    create: { email },
    select: { id: true },
  })

  // create session and encode tokens
  const { id: sessionId } = await db.session.create({
    data: {
      userId,
      expiresAt: makeRefreshExpiresAt(),
    },
    select: { id: true },
  })

  const [accessToken, refreshToken] = await Promise.all([
    encodeAccessSession({ userId, sessionId }),
    encodeRefreshSession({ userId, sessionId }),
  ])

  return c.json({ accessToken, refreshToken }, 200)
}

export { handler as handlerVerifySignIn, route as routeVerifySignIn }
