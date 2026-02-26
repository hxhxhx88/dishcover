import { env } from '@/lib/env'
import { wdioConfigCommon } from '@/lib/wdio.conf'

export const config: WebdriverIO.Config = {
  ...wdioConfigCommon,
  capabilities: [{
    'platformName': 'Android',
    'appium:avd': env.DEV_DEVICE_ANDROID,
    'appium:automationName': 'UIAutomator2',
    'appium:app': '../apps/app-mobile/android/app/build/outputs/apk/release/app-release.apk',
    'appium:settings': {
      // To allow unified behavior across iOS and Android for `testID`.
      // https://github.com/appium/appium/issues/21042
      disableIdLocatorAutocompletion: true,
    },
    'appium:newCommandTimeout': 300,
    'appium:fullReset': false,
  }],
}
