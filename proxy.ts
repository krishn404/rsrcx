import { type NextRequest, NextResponse } from "next/server"

export function proxy(request: NextRequest) {
  // Admin routes are now publicly accessible
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
