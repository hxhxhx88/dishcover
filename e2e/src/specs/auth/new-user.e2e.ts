import { env } from '@/lib/env-worker'
import { suiteIsolated } from '@/lib/testing'
import { resetClientState } from '@/lib/utils'
import { pageAuthCode } from '@/pages/auth-code.page'
import { pageAuthEmail } from '@/pages/auth-email.page'
import { pageMain } from '@/pages/main.page'

suiteIsolated('new user', undefined, (ctx) => {
  it('can sign in', async () => {
    await resetClientState(driver, { databaseUrl: ctx.getDatabaseUrl() })

    await pageMain.tapSignIn()
    await pageAuthEmail.submitEmail('test@example.com')
    await pageAuthCode.waitForDisplayed()
    await pageAuthCode.typeOtp(env.VERIFICATION_PRIVATE_CODE)
    await pageMain.expectSignedIn()
  })
})
