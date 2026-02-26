import { $ } from '@wdio/globals'

class PageMain {
  get screen() { return $('id=screen-main') }

  async waitForDisplay(): Promise<void> {
    await this.screen.waitForDisplayed()
  }
}

export const pageMain = new PageMain()
