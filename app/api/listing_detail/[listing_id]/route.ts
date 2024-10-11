import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import http from '../../../../lib/http'

export type ListingDetailParams = {
  params: {
    listing_id: string
  }
}

export async function GET(
  _request: NextRequest,
  { params }: ListingDetailParams
) {
  const response = await http.get(
    `${process.env.SERVICE_BASE}/listing/${params.listing_id}`
  )
  return NextResponse.json(response.data, { status: response.status })
}
