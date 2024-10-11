import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import http from '../../../../../../lib/http'

export type BoundaryParams = {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: BoundaryParams) {
  const response = await http.get(
    `${process.env.SERVICE_BASE}/listing/search/boundary/${params.id}`,
    { params: request.nextUrl.searchParams }
  )
  return NextResponse.json(response.data, { status: response.status })
}
