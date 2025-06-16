/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { NextRequest } from "next/server";

export async function ipinfo(request: NextRequest) {
  let userIP:any = request?.headers?.get('x-forwarded-for')
  // let USER_AGENT = request?.headers?.get('user-agent')
  // let BROWSER = request?.headers?.get('sec-ch-ua')
  // let OS = request?.headers?.get('sec-ch-ua-platform')
  // let MOBILE = request?.headers?.get('sec-ch-ua-mobile')

  const response = await fetch(`https://ipinfo.io/${userIP}?token=${process.env.IPINFO_API_KEY}`)
  const data = await response.json()
  return data
} 