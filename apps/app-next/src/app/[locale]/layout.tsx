import type { Metadata } from 'next'
import type { JSX } from 'react'
import { i18n } from '@lingui/core'
import { APP_NAME } from '@repo/metadata'
import { Geist, Geist_Mono } from 'next/font/google'
import { setupI18n } from '@/lib/i18n'
import { I18nProvider } from '@/providers/i18n'

import '@/styles/base.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: APP_NAME,
}

export default async function Layout({ children, params }: LayoutProps<'/[locale]'>): Promise<JSX.Element> {
  const { locale: localeString } = await params
  const { locale } = await setupI18n(localeString)

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <I18nProvider locale={locale} messages={i18n.messages}>
          <main className="w-full">{children}</main>
        </I18nProvider>
      </body>
    </html>
  )
}
