import type { PayloadAction } from '@reduxjs/toolkit'
import type { ListingSearchGeocodeResponse } from '../../lib/types/listing_types'
import { createSlice } from '@reduxjs/toolkit'
import {
  SelectedListing,
  HighlightedMarker,
  ListingSearchState
} from './listingSearchTypes'
import {
  newLocationGeocodeSearch,
  searchCurrentLocation
} from './listingSearchCommon'

const initialState: ListingSearchState = {
  initialSearchComplete: false,
  doListingSearchOnMapIdle: false,
  listingSearchRunning: false,
  listingServiceResponse: null,
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
      state.listingServiceResponse = action.payload
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
      // just update the parts that would change with this type of search. the initial search would have set boundary
      // and geocoderResult attributes that we don't want to overwite
      state.listingServiceResponse = state.listingServiceResponse ?? {}
      state.listingServiceResponse.listings = action.payload.listings
      state.listingServiceResponse.pagination = action.payload.pagination
    })

    builder.addCase(searchCurrentLocation.rejected, (state, action) => {
      state.listingSearchRunning = false
      console.error(action.error)
    })
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
