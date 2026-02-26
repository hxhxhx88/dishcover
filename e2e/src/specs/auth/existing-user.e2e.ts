import type { Tx } from '@repo/db'
import { env } from '@/lib/env-worker'
import { suiteIsolated } from '@/lib/testing'
import { resetClientState } from '@/lib/utils'
import { pageAuthCode } from '@/pages/auth-code.page'
import { pageAuthEmail } from '@/pages/auth-email.page'
import { pageMain } from '@/pages/main.page'

const email = 'test@example.com'

async function initDatabase(tx: Tx): Promise<void> {
  await tx.user.createMany({
    data: [{ email }],
  })
}

suiteIsolated('existing user', initDatabase, (ctx) => {
  it('can sign in', async () => {
    await resetClientState(driver, { databaseUrl: ctx.getDatabaseUrl() })

    await pageMain.tapSignIn()
    await pageAuthEmail.submitEmail(email)
    await pageAuthCode.waitForDisplayed()
    await pageAuthCode.typeOtp(env.VERIFICATION_PRIVATE_CODE)
    await pageMain.expectSignedIn()
  })
})
