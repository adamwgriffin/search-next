import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import http from '../../../../lib/http'

export type ListingIdsParams = {
  params: {
    listing_ids: string
  }
}

export async function GET(
  _request: NextRequest,
  { params }: ListingIdsParams
) {
  const response = await http.get(
    `${process.env.SERVICE_BASE}/listings/${params.listing_ids}`
  )
  return NextResponse.json(response.data, { status: response.status })
}
