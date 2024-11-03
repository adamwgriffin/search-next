import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import mongooseConnect from '../../../../lib/mongooseConnect'
import Listing from '../../../../models/ListingModel'
import { ListingDetailResultProjectionFields } from '../../../../config/listing_search.config'
import { daysOnMarket } from '../../../../lib/listing_search_helpers'

export type ListingDetailParams = {
  params: {
    listing_id: string
  }
}

export async function GET(
  _request: NextRequest,
  { params }: ListingDetailParams
) {
  await mongooseConnect()

  const listing = await Listing.findById(
    params.listing_id,
    ListingDetailResultProjectionFields
  )
  if (!listing) {
    return NextResponse.json(
      { message: `Listing not found with ID ${params.listing_id}` },
      { status: 404 }
    )
  }
  return NextResponse.json({
    ...listing.toObject(),
    daysOnMarket: daysOnMarket(listing.listedDate, listing.soldDate)
  })
}
