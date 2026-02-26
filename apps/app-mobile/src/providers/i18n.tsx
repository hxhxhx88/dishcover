import type { JSX, ReactNode } from 'react'
import { i18n } from '@lingui/core'
import { I18nProvider as Provider } from '@lingui/react'
import { initializeI18n } from '@/lib/i18n'

initializeI18n()

export function I18nProvider({ children }: { children: ReactNode }): JSX.Element {
  return <Provider i18n={i18n}>{children}</Provider>
}
