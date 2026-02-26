import type { AppState } from '@repo/lib/schemas/app-mobile-state'
import { APP_PACKAGE_NAME, APP_SLUG } from '@repo/metadata'
import { env } from './env-worker'
import { log } from './logging'

export async function resetClientState(driver: WebdriverIO.Browser, state: AppState): Promise<void> {
  if (!state.databaseUrl) {
    throw new Error('databaseUrl is required')
  }
  log.info(`API origin: ${env.API_ORIGIN}`)

  const fullState: AppState = {
    ...state,
    apiOrigin: env.API_ORIGIN,
    apiHeaders: {
      // https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation#using-protection-bypass-for-automation
      'x-vercel-protection-bypass': env.VERCEL_AUTOMATION_BYPASS_SECRET ?? '',
    },
  }
  log.debug(`Client state: ${JSON.stringify(fullState)}`)

  // Trigger a deep link
  const encodedState = encodeURIComponent(JSON.stringify(fullState))
  await driver.execute('mobile: deepLink', {
    url: `${APP_SLUG}://dev/reset-state?stateJson=${encodedState}`,
    package: APP_PACKAGE_NAME, // `package` is required by Android
  })

  // Wait for confirmation screen to be displayed
  const confirmationText = $('id=text-state-reset')
  await confirmationText.waitForDisplayed()
  await expect(confirmationText).toBeDisplayed()

  // Kill and re-open the app
  await driver.terminateApp(APP_PACKAGE_NAME)
  await driver.activateApp(APP_PACKAGE_NAME)
};
