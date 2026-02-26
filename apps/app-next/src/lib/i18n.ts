import type { I18n } from '@lingui/core'
import type { Locale } from '@repo/i18n/locales'
import type { NextRequest } from 'next/server'
import { i18n as i18nGlobal } from '@lingui/core'
import { setI18n } from '@lingui/react/server'
import { defaultLocale, locales, localeSchema } from '@repo/i18n/locales'
import { setupI18nInstance } from '@repo/i18n/server'
import Negotiator from 'negotiator'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

function hintRequestLocale({ acceptLanguage }: { acceptLanguage: string | undefined }): Locale {
  const languages = new Negotiator({
    headers: { 'accept-language': acceptLanguage },
  }).languages([...locales])

  if (languages.length === 0) {
    return defaultLocale
  }

  return localeSchema.catch(defaultLocale).parse(languages[0])
}

export const i18nCookieName = 'APP_LOCALE'

// See:
// - https://nextjs.org/docs/app/building-your-application/routing/internationalization
// - https://github.com/lingui/js-lingui/blob/d36c323c2151f91b05305809bc9a6d291528aed2/examples/nextjs-swc/src/middleware.ts
export async function i18nMiddleware(request: NextRequest): Promise<NextResponse> {
  const cookieStore = await cookies()

  const { pathname } = request.nextUrl
  const currLocale = locales.find(l => pathname.startsWith(`/${l}/`) || pathname === `/${l}`)

  if (currLocale) {
    cookieStore.set(i18nCookieName, currLocale)

    return NextResponse.next()
  }

  // Redirect if there is no locale
  const fromCookie = cookieStore.get(i18nCookieName)?.value
  const fromHeader = hintRequestLocale({
    acceptLanguage: request.headers.get('accept-language') ?? undefined,
  })
  const locale = fromCookie ?? fromHeader
  request.nextUrl.pathname = `/${locale}${pathname}`
  cookieStore.set(i18nCookieName, locale)

  return NextResponse.redirect(request.nextUrl)
}

export async function setupI18n(localeString: string): Promise<{ i18n: I18n, locale: Locale }> {
  const { i18n, locale } = await setupI18nInstance(i18nGlobal, localeString)
  setI18n(i18n)

  return { i18n, locale }
}
