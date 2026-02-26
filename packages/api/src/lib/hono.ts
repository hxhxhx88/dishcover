import type { AccessSession } from '@repo/api/lib/session'
import type { PrismaClient } from '@repo/db'
import type { Locale } from '@repo/i18n/locales'

export interface AppContext {
  Variables: {
    db: PrismaClient
    locale: Locale
    apiKey: string
    session?: AccessSession
    timeZone?: string
  }
}
