import { $ } from '@wdio/globals'

class PageAuthEmail {
  get inputEmail() { return $('id=input-email') }
  get buttonContinue() { return $('id=button-continue') }

  async waitForDisplayed(): Promise<void> {
    await this.inputEmail.waitForDisplayed()
  }

  async submitEmail(email: string): Promise<void> {
    await this.inputEmail.waitForDisplayed()
    await this.inputEmail.setValue(email)
    await this.buttonContinue.waitForDisplayed()
    await this.buttonContinue.click()
  }
}

export const pageAuthEmail = new PageAuthEmail()
