/* eslint-disable @next/next/no-server-import-in-page */
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  //return NextResponse.redirect(new URL('/about-2', request.url))

  if (req.nextUrl.pathname.startsWith('/api/entries/')) {
    
    const id = req.nextUrl.pathname.replace('/api/entries/','');
    const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

    if(checkMongoIDRegExp.test(id)) {
      const url=req.nextUrl.clone(); 
      url.pathname='/api/bad-request';
      url.search= `?message = ${id} is not a valid MongoID`;

      return NextResponse.rewrite(url);
    }
  }

  console.log({req: req.nextUrl});

  return NextResponse.next();

}

// See "Matching Paths" below to learn more, por donde va a utilizar lo midd.
export const config = {
//  matcher: '/about/:path*',
  matcher:[
    'api/:path',
    'api/entries/',
  ]
}