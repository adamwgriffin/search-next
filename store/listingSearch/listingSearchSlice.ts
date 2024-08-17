import type { PayloadAction } from '@reduxjs/toolkit'
import type {
  ListingSearchGeocodeResponse,
  ListingSearchBoundaryResponse
} from '../../lib/types/listing_types'
import { createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from '../../lib/store_helpers'
import http from '../../lib/http'
import {
  selectParamsForGeocodeSearch,
  selectParamsForGeospatialSearch
} from './listingSearchSelectors'
import {
  SelectedListing,
  HighlightedMarker,
  ListingSearchState
} from './listingSearchTypes'

const initialState: ListingSearchState = {
  initialSearchComplete: false,
  doListingSearchOnMapIdle: false,
  listingSearchRunning: false,
  listingServiceResponse: null,
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
export const searchNewLocation =
  createAppAsyncThunk<ListingSearchGeocodeResponse>(
    'listingSearch/searchNewLocation',
    async (_arg, { getState }) => {
      const response = await http.get<ListingSearchGeocodeResponse>(
        '/api/listing/search/geocode',
        {
          params: selectParamsForGeocodeSearch(getState())
        }
      )
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
export const searchCurrentLocation =
  createAppAsyncThunk<ListingSearchBoundaryResponse>(
    'listingSearch/searchCurrentLocation',
    async (_arg, { getState }) => {
      const state = getState()
      const url = state.listingMap.boundaryActive
        ? `/api/listing/search/boundary/${state.listingSearch.listingServiceResponse?.boundary?._id}`
        : 'api/listing/search/bounds'
      const response = await http.get<ListingSearchBoundaryResponse>(url, {
        params: selectParamsForGeospatialSearch(state)
      })
      return response.data
    }
  )

export const searchWithUpdatedFilters = createAppAsyncThunk(
  'listingSearch/searchWithUpdatedParams',
  async (_args, { dispatch }) => {
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
      // essentially what we're doing by setting doListingSearchOnMapIdle is triggering searchCurrentLocation via
      // handleIdle in the ListingMap component. the only problem is if you were to search again in the same location
      // the map idle event would not be triggered
      if (!action.payload.boundary) {
        state.doListingSearchOnMapIdle = true
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
  setSelectedListing,
  setHighlightedMarker,
  setDoListingSearchOnMapIdle
} = listingSearchSlice.actions

export default listingSearchSlice.reducer
