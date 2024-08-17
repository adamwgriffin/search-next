import { ListingSearchGeocodeResponse } from '../../lib/types/listing_types'

export type SelectedListing = string | null

export type HighlightedMarker = string | null

export interface ListingSearchState {
  initialSearchComplete: boolean
  doListingSearchOnMapIdle: boolean
  listingSearchRunning: boolean
  listingServiceResponse: Partial<ListingSearchGeocodeResponse> | null
  selectedListing: SelectedListing
  highlightedMarker: HighlightedMarker
}
