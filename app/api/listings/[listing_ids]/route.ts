import { type NextRequest, NextResponse } from 'next/server'
import dbConnect from '../../../../lib/dbConnect'
import Listing from '../../../../models/ListingModel'
import { ListingResultProjectionFields } from '../../../../config'

export type ListingIdsParams = {
  params: {
    listing_ids: string
  }
}

export async function GET(_request: NextRequest, { params }: ListingIdsParams) {
  await dbConnect()

  const ids = params.listing_ids.split(',')
  const listings = await Listing.find(
    { _id: { $in: ids } },
    ListingResultProjectionFields
  )
  return NextResponse.json({ listings })
}
