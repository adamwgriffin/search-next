import type { PayloadAction } from '@reduxjs/toolkit'
import type { ListingSearchGeocodeResponse } from '../../types/listing_types'
import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import {
  SelectedListing,
  HighlightedMarker,
  ListingSearchState
} from './listingSearchTypes'
import {
  newLocationGeocodeSearch,
  searchCurrentLocation
} from './listingSearchCommon'
import { listingFoundForAddressSearch } from '../listingDetail/listingDetailSlice'

const initialState: ListingSearchState = {
  boundaryId: null,
  listings: [],
  pagination: null,
  initialSearchComplete: false,
  doListingSearchOnMapIdle: false,
  listingSearchRunning: false,
  selectedListing: null,
  highlightedMarker: null
}

export const listingSearchSlice = createSlice({
  name: 'listingSearch',

  initialState,

  reducers: {
    boundaryFoundForNewLocationSearch: (
      state,
      action: PayloadAction<ListingSearchGeocodeResponse>
    ) => {
      if (!action.payload.boundary) {
        throw new Error(
          'No boundary present for boundaryFoundForNewLocationSearch payload'
        )
      }
      state.boundaryId = action.payload.boundary._id
      state.listings = action.payload.listings || []
      state.pagination = action.payload.pagination || null
      state.listingSearchRunning = false
    },

    noBoundaryFoundForNewLocationSearch: (
      state,
      _action: PayloadAction<ListingSearchGeocodeResponse>
    ) => {
      state.doListingSearchOnMapIdle = true
    },

    setSelectedListing: (state, action: PayloadAction<SelectedListing>) => {
      state.selectedListing = action.payload
    },

    setHighlightedMarker: (state, action: PayloadAction<HighlightedMarker>) => {
      state.highlightedMarker = action.payload
    },

    setDoListingSearchOnMapIdle: (state, action: PayloadAction<boolean>) => {
      state.doListingSearchOnMapIdle = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(newLocationGeocodeSearch.pending, (state) => {
      state.listingSearchRunning = true
    })

    builder.addCase(newLocationGeocodeSearch.fulfilled, (state) => {
      if (!state.initialSearchComplete) {
        state.initialSearchComplete = true
      }
    })

    builder.addCase(newLocationGeocodeSearch.rejected, (state, action) => {
      state.listingSearchRunning = false
      console.error(action.error)
    })

    builder.addCase(searchCurrentLocation.pending, (state) => {
      state.listingSearchRunning = true
    })

    builder.addCase(searchCurrentLocation.fulfilled, (state, action) => {
      state.listingSearchRunning = false
      state.listings = action.payload.listings
      state.pagination = action.payload.pagination
    })

    builder.addCase(searchCurrentLocation.rejected, (state, action) => {
      state.listingSearchRunning = false
      console.error(action.error)
    })

    // Reset the boundaryId to null for actions that indicate there is no boundary available or needed based on the
    // listing service response
    builder.addMatcher(
      isAnyOf(
        listingFoundForAddressSearch,
        noBoundaryFoundForNewLocationSearch
      ),
      (state) => {
        state.boundaryId = initialState.boundaryId
      }
    )
  }
})

export const {
  boundaryFoundForNewLocationSearch,
  noBoundaryFoundForNewLocationSearch,
  setSelectedListing,
  setHighlightedMarker,
  setDoListingSearchOnMapIdle
} = listingSearchSlice.actions

export default listingSearchSlice.reducer
