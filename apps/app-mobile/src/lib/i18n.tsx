import type { Locale } from '@repo/i18n/locales'
import { i18n } from '@lingui/core'
import { messages as messagesEnUs } from '@repo/i18n/messages/en-us'
import { messages as messagesZhCn } from '@repo/i18n/messages/zh-cn'
import { getLocales } from 'expo-localization'

export function currentLocale(): Locale {
  const locales = getLocales()
  const locale = locales[0]

  if (!locale) {
    return 'en-us'
  }

  const { languageCode } = locale

  if (languageCode === 'zh') {
    return 'zh-cn'
  }

  return 'en-us'
}

export function initializeI18n(): void {
  const locale = currentLocale()

  switch (locale) {
    case 'en-us': {
      i18n.loadAndActivate({ locale, messages: messagesEnUs })
      break
    }

    case 'zh-cn': {
      i18n.loadAndActivate({ locale, messages: messagesZhCn })
      break
    }
  }
}
