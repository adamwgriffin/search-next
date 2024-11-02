import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import dbConnect from '../../../../../../lib/dbConnect'
import Listing from '../../../../../../models/ListingModel'
import Boundary from '../../../../../../models/BoundaryModel'
import { getPaginationParams } from '../../../../../../lib'
import { GeocodeBoundaryQueryParams } from '../../../../../../zod_schemas/geocodeBoundarySearchSchema'
import { getBoundaryGeometryWithBounds } from '../../../../../../lib/listing_search_helpers'
import listingSearchView from '../../../../../../views/listingSearchView'

export type BoundaryParams = {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: BoundaryParams) {
  await dbConnect()
  const boundary = await Boundary.findById(params.id)
  if (!boundary) {
    return NextResponse.json(
      { message: `No boundary found for boundary id ${params.id}.` },
      { status: 404 }
    )
  }
  const searchParamsObject: GeocodeBoundaryQueryParams = Object.fromEntries(
    request.nextUrl.searchParams.entries()
  )
  const pagination = getPaginationParams(searchParamsObject)
  const results = await Listing.findWithinBounds(
    getBoundaryGeometryWithBounds(boundary, searchParamsObject),
    searchParamsObject,
    pagination
  )
  return NextResponse.json(listingSearchView(results, pagination))
}
