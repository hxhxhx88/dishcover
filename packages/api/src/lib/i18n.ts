import type { Messages } from '@lingui/core'
import type { Locale } from '@repo/i18n/locales'
import { i18n } from '@lingui/core'
import { messages as messagesEnUs } from '@repo/i18n/messages/en-us'
import { messages as messagesZhCn } from '@repo/i18n/messages/zh-cn'

const messages: Record<Locale, Messages> = {
  'en-us': messagesEnUs,
  'zh-cn': messagesZhCn,
} as const

i18n.load(messages)

export { i18n } from '@lingui/core'
