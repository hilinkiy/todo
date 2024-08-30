import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { EnumTokens } from './services/auth-token.service'
import { DASHBOARD_PAGES } from './config/pages-url.config'

const intlMiddleware = createMiddleware({
  locales: ['en', 'ru', 'uz'],
  defaultLocale: 'en',
})

export async function middleware(request: NextRequest, response: NextResponse) {
  const { url, cookies } = request

  const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value

  const isAuthPage = url.includes('/auth')

  if (isAuthPage && refreshToken) {
    return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, url))
  }

  if (isAuthPage) {
    return NextResponse.next()
  }

  if (!refreshToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return intlMiddleware(request)
}

// Конфигурация matcher
export const config = {
  matcher: ['/', '/(ru|en|uz)/:path*', '/auth/:path*'],
}
