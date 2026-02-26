import { env } from '@/lib/env'
import { wdioConfigCommon } from '@/lib/wdio.conf'

export const config: WebdriverIO.Config = {
  ...wdioConfigCommon,
  capabilities: [{
    'platformName': 'iOS',
    'appium:deviceName': env.DEV_DEVICE_IOS,
    'appium:automationName': 'XCUITest',
    'appium:app': '../apps/app-mobile/ios/build/Build/Products/Release-iphonesimulator/DishCover.app',
    'appium:fullReset': false,
    'appium:newCommandTimeout': 300,
  }],
}
