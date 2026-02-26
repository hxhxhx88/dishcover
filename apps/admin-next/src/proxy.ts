import type { NextRequest } from 'next/server'
import { Buffer } from 'node:buffer'
import { NextResponse } from 'next/server'
import { env } from './lib/env'

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const authHeader = request.headers.get('authorization')
  const auth = authHeader?.split(' ')[1]

  if (auth) {
    const decodedAuth = Buffer.from(auth, 'base64').toString('utf8')
    const [user, pass] = decodedAuth.split(':')

    if (user === env.ADMIN_BASIC_AUTH_USERNAME && pass === env.ADMIN_BASIC_AUTH_PASSWORD) {
      // Good
      return NextResponse.next()
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      // This header triggers the browser's built-in login pop-up
      'WWW-Authenticate': 'Basic realm="Restricted Area"',
    },
  })
}

export const config = {
  matcher: ['/((?!api|public|_next|_vercel|.*\\..*).*)'],
}
