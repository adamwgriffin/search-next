import type { AppState } from '..'
import type { HighlightedMarker } from './listingSearchTypes'
import type { Listing } from '../../lib/types/listing_types'
import type { Pagination } from '../../components/listings/ListingResultsPagination/ListingResultsPagination'
import range from 'lodash/range'

export const selectHighlightedMarker = (state: AppState): HighlightedMarker =>
  state.listingSearch.highlightedMarker

export const selectListings = (state: AppState): Listing[] =>
  state.listingSearch.listingServiceResponse?.listings ?? []

export const selectDoListingSearchOnMapIdle = (state: AppState) =>
  state.listingSearch.doListingSearchOnMapIdle

export const selectListingSearchRunning = (state: AppState) =>
  state.listingSearch.listingSearchRunning

export const selectTotalListings = (state: AppState): number =>
  state.listingSearch.listingServiceResponse.number_found ?? 0

export const selectPagination = (state: AppState): Pagination => {
  const { pageIndex, pageSize } = state.filters
  const numberReturned =
    state.listingSearch.listingServiceResponse?.listings?.length || 0
  const numberAvailable =
    state.listingSearch.listingServiceResponse?.pagination?.numberAvailable || 0
  const numberOfPages = Math.ceil(numberAvailable / pageSize)
  return {
    start: pageIndex * pageSize + 1,
    end: pageIndex * pageSize + numberReturned,
    total: numberAvailable,
    pages: range(0, numberOfPages),
    currentPage: pageIndex
  }
}
