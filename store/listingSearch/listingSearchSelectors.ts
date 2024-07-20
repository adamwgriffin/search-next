import type { AppState } from '..'
import type { HighlightedMarker } from './listingSearchTypes'
import type { Listing } from '../../lib/types/listing_types'
import type { Pagination } from '../../components/listings/ListingResultsPagination/ListingResultsPagination'
import range from 'lodash/range'
import { createSelector } from '@reduxjs/toolkit'
import { selectFilters } from '../filters/filtersSelectors'

export const selectInitialSearchComplete = (state: AppState): boolean =>
  state.listingSearch.initialSearchComplete

export const selectHighlightedMarker = (state: AppState): HighlightedMarker =>
  state.listingSearch.highlightedMarker

export const selectDoListingSearchOnMapIdle = (state: AppState) =>
  state.listingSearch.doListingSearchOnMapIdle

export const selectListingSearchRunning = (state: AppState) =>
  state.listingSearch.listingSearchRunning

export const selectListingServiceResponse = (state: AppState) =>
  state.listingSearch.listingServiceResponse

export const selectListings = createSelector(
  selectListingServiceResponse,
  (listingServiceResponse): Listing[] => listingServiceResponse.listings ?? []
)

export const selectTotalListings = createSelector(
  [selectListingServiceResponse],
  (listingServiceResponse) => listingServiceResponse.number_found ?? 0
)

export const selectPagination = createSelector(
  [selectFilters, selectListings, selectListingServiceResponse],
  (filters, listings, listingServiceResponse): Pagination => {
    const { pageIndex, pageSize } = filters
    const numberReturned = listings.length
    const numberAvailable = listingServiceResponse.pagination?.numberAvailable ?? 0
    const numberOfPages = Math.ceil(numberAvailable / pageSize)
    return {
      start: pageIndex * pageSize + 1,
      end: pageIndex * pageSize + numberReturned,
      total: numberAvailable,
      pages: range(0, numberOfPages),
      currentPage: pageIndex
    }
  }
)
