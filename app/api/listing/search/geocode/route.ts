import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import http from '../../../../../lib/http'

export async function GET(request: NextRequest) {
  const response = await http.get(
    `${process.env.SERVICE_BASE}/listing/search/geocode`,
    { params: request.nextUrl.searchParams }
  )
  return NextResponse.json(response.data, { status: response.status })
}
