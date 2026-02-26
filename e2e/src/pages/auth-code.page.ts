import { $, driver } from '@wdio/globals'

class PageAuthCode {
  get textOtpDescription() { return $('id=text-otp-description') }

  async waitForDisplayed(): Promise<void> {
    await this.textOtpDescription.waitForDisplayed()
  }

  async typeOtp(code: string): Promise<void> {
    for (const digit of code) {
      await driver.keys([digit])
    }
  }
}

export const pageAuthCode = new PageAuthCode()
