export type SelectedListing = string | null

export type HighlightedMarker = string | null

export interface ListingSearchState {
  initialSearchComplete: boolean
  doListingSearchOnMapIdle: boolean
  listingSearchRunning: boolean
  listingServiceResponse: any
  selectedListing: SelectedListing
  highlightedMarker: HighlightedMarker
}
