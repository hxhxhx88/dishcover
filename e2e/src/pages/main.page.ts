import { $, expect } from '@wdio/globals'

class PageMain {
  get buttonSignIn() { return $('id=button-sign-in') }
  get buttonSignOut() { return $('id=button-sign-out') }

  async tapSignIn(): Promise<void> {
    await this.buttonSignIn.waitForDisplayed()
    await this.buttonSignIn.click()
  }

  async signOut(): Promise<void> {
    await this.buttonSignOut.waitForDisplayed()
    await this.buttonSignOut.click()
    await this.expectSignedOut()
  }

  async expectSignedIn(): Promise<void> {
    await this.buttonSignOut.waitForDisplayed()
    await expect(this.buttonSignOut).toBeDisplayed()
  }

  async expectSignedOut(): Promise<void> {
    await this.buttonSignIn.waitForDisplayed()
    await expect(this.buttonSignIn).toBeDisplayed()
  }
}

export const pageMain = new PageMain()
