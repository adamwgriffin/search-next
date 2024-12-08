import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import mongooseConnect from '../../../../lib/mongooseConnect'
import Listing from '../../../../models/ListingModel'
import { ListingDetailResultProjectionFields } from '../../../../config/listing_search.config'
import { daysOnMarket } from '../../../../lib/listing_search_helpers'

export type ListingDetailParams = {
  slug: string
}

export async function GET(
  _request: NextRequest,
  { params }: { params: ListingDetailParams }
) {
  await mongooseConnect()

  const listing = await Listing.findOne(
    { slug: params.slug },
    ListingDetailResultProjectionFields
  )
  if (!listing) {
    return NextResponse.json(
      { message: `Listing not found with slug ${params.slug}` },
      { status: 404 }
    )
  }
  const currentOpenHouses = listing.openHouses?.filter((openHouse) => {
    return openHouse.start > new Date()
  })
  return NextResponse.json({
    ...listing.toObject(),
    openHouses: currentOpenHouses,
    daysOnMarket: daysOnMarket(listing.listedDate, listing.soldDate)
  })
}
