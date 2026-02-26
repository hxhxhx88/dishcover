import type { NextRequest, NextResponse } from 'next/server'
import { i18nMiddleware } from '@/lib/i18n'

export async function proxy(request: NextRequest): Promise<NextResponse> {
  return i18nMiddleware(request)
}

export const config = {

  matcher: ['/((?!api|public|_next|_vercel|.*\\..*).*)'],
}
