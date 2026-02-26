import type { PrismaClient } from '@repo/db'
import type { Locale } from '@repo/i18n/locales'

export interface AppContext {
  Variables: {
    db: PrismaClient
    locale: Locale
    timeZone?: string
  }
}
