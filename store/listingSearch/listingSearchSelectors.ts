import type { AppState } from '..'
import type { HighlightedMarker } from './listingSearchTypes'
import type { Listing } from '../../lib/types/listing_types'
import type { Pagination } from '../../components/listings/ListingResultsPagination/ListingResultsPagination'
import type { ListingServiceParams } from '../../lib/types/listing_service_params_types'
import range from 'lodash/range'
import { createSelector } from '@reduxjs/toolkit'
import { convertFiltersToListingServiceParams } from '../../lib/listing_service_params'
import { selectBounds } from '../listingMap/listingMapSelectors'

const selectFilterState = (state: AppState) => state.filters

export const selectInitialSearchComplete = (state: AppState): boolean =>
  state.listingSearch.initialSearchComplete

export const selectHighlightedMarker = (state: AppState): HighlightedMarker =>
  state.listingSearch.highlightedMarker

export const selectDoListingSearchOnMapIdle = (state: AppState) =>
  state.listingSearch.doListingSearchOnMapIdle

export const selectListingSearchRunning = (state: AppState) =>
  state.listingSearch.listingSearchRunning


export const selectListings = (state: AppState) =>
  state.listingSearch.listings

export const selectListingSearchPagination = (state: AppState) =>
  state.listingSearch.pagination

export const selectTotalListings = createSelector(
  [selectListingSearchPagination],
  (listingSearchPagination) => listingSearchPagination?.numberAvailable ?? 0
)

export const selectPagination = createSelector(
  [selectFilterState, selectListings, selectTotalListings],
  (filters, listings, totalListings): Pagination => {
    const { pageIndex, pageSize } = filters
    const numberReturned = listings.length
    const numberOfPages = Math.ceil(totalListings / pageSize)
    return {
      start: pageIndex * pageSize + 1,
      end: pageIndex * pageSize + numberReturned,
      total: totalListings,
      pages: range(0, numberOfPages),
      currentPage: pageIndex
    }
  }
)

export const selectParamsForGeospatialSearch = createSelector(
  [selectFilterState, selectBounds],
  (filters, bounds): ListingServiceParams =>
    convertFiltersToListingServiceParams({ ...filters, ...bounds })
)

export const selectParamsForGeocodeSearch = createSelector(
  [selectFilterState],
  (filters): ListingServiceParams => {
    return {
      ...convertFiltersToListingServiceParams(filters),
      address: filters.locationSearchField
    }
  }
)
