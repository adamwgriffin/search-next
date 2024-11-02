import type { NextRequest } from 'next/server'
import type { GeocodeBoundaryQueryParams } from '../../../../../zod_schemas/geocodeBoundarySearchSchema'
import { NextResponse } from 'next/server'
import {
  getResponseForBoundary,
  getResponseForListingAddress,
  getResponseForPlaceId
} from '../../../../../lib/listing_search_helpers'
import {
  geocode,
  getGeocodeParamsFromQuery,
  isListingAddressType
} from '../../../../../lib/geocoder'
import dbConnect from '../../../../../lib/dbConnect'

export async function GET(request: NextRequest) {
  await dbConnect()

  const searchParamsObject: GeocodeBoundaryQueryParams = Object.fromEntries(
    request.nextUrl.searchParams.entries()
  )

  const placeIdRes = await getResponseForPlaceId(searchParamsObject)
  if (placeIdRes) {
    return NextResponse.json(placeIdRes)
  }

  const { place_id, address } = searchParamsObject
  const geocodeResult = (
    await geocode(getGeocodeParamsFromQuery({ place_id, address }))
  ).data.results[0]

  if (isListingAddressType(geocodeResult.types)) {
    return NextResponse.json(await getResponseForListingAddress(geocodeResult))
  }

  return NextResponse.json(
    await getResponseForBoundary(geocodeResult, searchParamsObject)
  )
}
