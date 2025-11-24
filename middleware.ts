import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  // We move the logic to a helper file to keep this clean
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (so we don't redirect people trying to log in!)
     * - auth (so auth callback works)
     */
    '/((?!_next/static|_next/image|favicon.ico|login|auth).*)',
  ],
}