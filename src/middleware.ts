import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "@/app/database.types";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient<Database>({ req, res })


  // Refresh session if expired - required for server components
  const { data :{
    session
  }, error } = await supabase.auth.getSession();

  // console.log(req.nextUrl.pathname, "PATHNAME", session);

  if (session && req.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (
    !session && (
      req.nextUrl.pathname.startsWith('/checkout') ||
      req.nextUrl.pathname.startsWith('/success') ||
      req.nextUrl.pathname.startsWith('/orders') ||
      req.nextUrl.pathname.startsWith('/address')
    )
  ){
    return NextResponse.redirect(new URL('/auth', req.url))
  }

  return res;
}


export const config = {
  matcher : [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
}


// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
// import { NextResponse } from 'next/server'

// import type { NextRequest } from 'next/server'
// import type { Database } from '@/app/database.types'

// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next()

//   // Create a Supabase client configured to use cookies
//   const supabase = createMiddlewareClient<Database>({ req, res })

//   // Refresh session if expired - required for Server Components
//   const {data, error } = await supabase.auth.getSession()
//   console.log(data?.session)
//   return res
// }

// // Ensure the middleware is only called for relevant paths.
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     '/((?!_next/static|_next/image|favicon.ico).*)',
//   ],
// }