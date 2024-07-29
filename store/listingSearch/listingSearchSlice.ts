import type { AppState } from '..'
import { resetStartIndex } from '../filters/filtersSlice'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from '../../lib/http'
import {
  selectParamsForGeocodeSearch,
  selectParamsForGeospatialSearch
} from './listingSearchSelectors'
import { SelectedListing, HighlightedMarker, ListingSearchState } from './listingSearchTypes'

const initialState: ListingSearchState = {
  initialSearchComplete: false,
  doListingSearchOnMapIdle: false,
  listingSearchRunning: false,
  listingServiceResponse: {},
  selectedListing: null,
  highlightedMarker: null
}

// executes a listing service request for a new location. we use the text that was entered in the search field to
// include the "address" param in this request. with this endpoint, the listing service takes care of getting all the
// geospatial data we need to find the listings. first, it geocodes the place text that was passed in the address param
// using google's geocoder service. next, it gets the boundary layer from our database using the lat/lng, and type from
// the geocoder response. finally, it searches for listings in our databse which have coordinates that are inside that
// boundary layer. the resulting response from the service includes the listings and the boundary so we can draw them on
// the map.
export const searchNewLocation = createAsyncThunk(
  'listingSearch/searchNewLocation',
  async (_arg, { getState }) => {
    // typescript doesn't know the type of our redux state that's returned so we have to set it as AppState
    const state = getState() as AppState
    const response = await http({
      url: '/api/listing/search/geocode',
      params: selectParamsForGeocodeSearch(state)
    })
    return response.data
  }
)

// executes a listing service request for the current location. we would want to use this request if the place that was
// entered in the search field has already been geocoded. usually, we would perform the initial search using the
// searchNewLocation() action, which has the service geocode the location. then we would use this for subsequent
// requests, such as if the user dragged the map or changed the filters. since we have the boundary data stored from the
// previous request, we can just pass the boundary ID to the service instead of having the service geocode the place for
// us again. if the boundary is not active then all we need is the viewport bounds, which will always be included in the
// params we use for this request.
export const searchCurrentLocation = createAsyncThunk(
  'listingSearch/searchCurrentLocation',
  async (_arg, { getState }) => {
    const state = getState() as AppState
    const url = state.listingMap.boundaryActive
      ? `/api/listing/search/boundary/${state.listingSearch.listingServiceResponse.boundary._id}`
      : 'api/listing/search/bounds'
    const response = await http({
      url,
      params: selectParamsForGeospatialSearch(state)
    })
    return response.data
  }
)

export const searchWithUpdatedFilters = createAsyncThunk(
  'listingSearch/searchWithUpdatedParams',
  async (_args, { dispatch }) => {
    dispatch(resetStartIndex())
    dispatch(searchCurrentLocation())
  }
)

export const listingSearchSlice = createSlice({
  name: 'listingSearch',

  initialState,

  reducers: {
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
    builder.addCase(searchNewLocation.pending, (state) => {
      state.listingSearchRunning = true
    })

    builder.addCase(searchNewLocation.fulfilled, (state, action) => {
      state.listingServiceResponse = action.payload
      state.listingSearchRunning = false
      if (!state.initialSearchComplete) {
        state.initialSearchComplete = true
      }
    })

    builder.addCase(searchNewLocation.rejected, (state, action) => {
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
  setSelectedListing,
  setHighlightedMarker,
  setDoListingSearchOnMapIdle
} = listingSearchSlice.actions

export default listingSearchSlice.reducer
