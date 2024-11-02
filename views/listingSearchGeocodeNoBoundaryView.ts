import type { GeocodeBoundarySearchResponse } from '../types/listing_search_response_types'
import type { ListingDetailResultWithSelectedFields } from '../types/listing_search_response_types'
import { AddressGeometry } from '@googlemaps/google-maps-services-js'

const listingSearchGeocodeNoBoundaryView = (
  viewport: AddressGeometry['viewport'],
  listingDetail: ListingDetailResultWithSelectedFields | null | undefined = null
): GeocodeBoundarySearchResponse => {
  listingDetail?.soldDate
  return listingDetail ? { listingDetail } : { viewport }
}

export default listingSearchGeocodeNoBoundaryView
