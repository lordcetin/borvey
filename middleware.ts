/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware(req: NextRequest) {

  const session:any = await auth();

  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (session?.user?.adminStatus !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }else if (req.nextUrl.pathname.startsWith('/panel')){
    if(session?.user?.fullName === null){
      return NextResponse.redirect(new URL('/', req.url));
    }
  }else{
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/api',
    '/admin',
    '/panel',
    '/api/auth/:path*',
  ],
}

// export { auth as middleware } from "@/auth"
