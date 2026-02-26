import type { RouteHandler } from '@hono/zod-openapi'
import type { AppContext } from '@repo/api/lib/hono'
import type { VerificationPayload } from '@repo/lib/schemas/verification-payload'
import { createRoute, z } from '@hono/zod-openapi'
import { t } from '@lingui/core/macro'
import { render } from '@react-email/render'
import { sendEmail } from '@repo/api/lib/email'
import { env } from '@repo/api/lib/env'
import { emailUserSignIn } from '@repo/email/templates/user-sign-in'
import { APP_NAME } from '@repo/metadata'

const requestSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('sign-in'),
    email: z.email(),
  }),
])

const responseSchema = z.object({
  publicCode: z.string(),
})

const route = createRoute({
  method: 'post',
  path: '/send',
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
  },
})

type Handler = RouteHandler<typeof route, AppContext>

function makePrivateCode(email: string): { code: string, isDev: boolean } {
  const devCode = env.DEV_VERIFICATION_PRIVATE_CODE
  if (devCode) {
    if (env.DEV_TESTER_EMAILS) {
      const emails = new Set(env.DEV_TESTER_EMAILS.split(','))
      if (emails.has(email)) {
        return { code: devCode, isDev: true }
      }
    }
    else {
      return { code: devCode, isDev: true }
    }
  }

  const code = Math.floor(100_000 + Math.random() * 900_000).toString()
  return { code, isDev: false }
}

const expireHours = 24

const handler: Handler = async (c) => {
  const { db } = c.var
  const { email } = c.req.valid('json')

  const payload: VerificationPayload = { type: 'sign-in', email }
  const { code: privateCode, isDev } = makePrivateCode(email)

  if (!isDev) {
    await sendEmail({
      fromEmail: env.EMAIL_SENDER,
      fromName: APP_NAME,
      toEmail: email,
      subject: t`${privateCode} is your ${APP_NAME} sign-in code`,
      htmlContent: await render(
        emailUserSignIn({
          code: privateCode,
          messages: {
            header: t`Your ${APP_NAME} sign-in code`,
            footer: t`This code will only be valid for the next ${expireHours} hours.`,
          },
        }),
      ),
    })
  }

  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * expireHours)
  const { id: publicCode } = await db.verification.create({
    data: {
      privateCode,
      payloadJson: JSON.stringify(payload),
      expiresAt,
    },
    select: {
      id: true,
    },
  })

  return c.json({ publicCode }, 200)
}

export { handler as handlerSend, route as routeSend }
