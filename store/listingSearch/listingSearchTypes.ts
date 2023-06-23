export type SelectedListing = string | null

export type HighlightedMarker = string | null

export interface ListingSearchState {
  doListingSearchOnMapIdle: boolean
  listingSearchRunning: boolean
  listingServiceResponse: any
  selectedListing: SelectedListing
  highlightedMarker: HighlightedMarker
}
