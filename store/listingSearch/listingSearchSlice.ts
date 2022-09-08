import type { AppState } from '..'
import type { Listing } from '../../lib/types'
import omitBy from 'lodash/omitBy'
import omit from 'lodash/omit'
import pick from 'lodash/pick'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { searchListingsNonDedupe } from './listingSearchAPI'
import { WebsitesSearchParams } from '../../lib/constants/search_param_constants'
import { modifyParam } from '../../lib/helpers/search_params'
import { selectBaseUrl } from '../environment/environmentSlice'
import { selectGeoType } from '../places/placesSlice'

export interface ListingSearchState {
  listingsPageIndex: number
  cluster_threshold: number
  listingSearchPending: boolean
  location_search_field: string
  searchListingsResponse: any
  searchParams: any
}

const initialState: ListingSearchState = {
  listingsPageIndex: 0,
  // TODO: we probably will not even use cluster_threshold anymore. paging through small sets of listings is a better
  // user experince that clustering large sets IMO
  cluster_threshold: 200,
  listingSearchPending: false,
  // "location_search_field" is a synonym for "street" in listing service. it is a valid search param but we don't
  // include it in "searchParams" because we are using it to geocode on the front end to get the center_lat & center_lon
  // coordinates. those coordinates are all that's really necessary to send the service if you already have them.
  location_search_field: '',
  searchListingsResponse: {},
  searchParams: WebsitesSearchParams,
}

// The function below is called a thunk and allows us to perform async logic. It can be dispatched like a regular
// action: `dispatch(searchListings(params))`. This will call the thunk with the `dispatch` function as the first
// argument. Async code can then be executed and other actions can be dispatched. Thunks are typically used to make
// async requests. The reducers for these async thunk actions need to be created in the "extraReducers" property of the
// slice below
export const searchListings = createAsyncThunk(
  'listingSearch/searchListings',
  async (params: object, { getState }) => {
    // need to declare return value of getState() as AppState otherwise Typscript complains that the "environment"
    // property does not exist
    const { environment } = getState() as AppState
    const baseUrl = selectBaseUrl(environment)
    const response = await searchListingsNonDedupe(baseUrl, params)
    // The value we return becomes the `fulfilled` action payload in extraReducers below
    return response.data
  }
)

export const listingSearchSlice = createSlice({
  name: 'listingSearch',

  initialState,

  reducers: {
    setLocationSearchField: (state, action: PayloadAction<string>) => {
      state.location_search_field = action.payload
    },
  
    resetListings: (state, action: PayloadAction) => {
      state.listingsPageIndex = initialState.listingsPageIndex
      state.searchListingsResponse = initialState.searchListingsResponse
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(searchListings.pending, (state) => {
        state.listingSearchPending = true
      })
      .addCase(searchListings.fulfilled, (state, action) => {
        state.listingSearchPending = false
        state.searchListingsResponse = action.payload
      })
      .addCase(searchListings.rejected, (state) => {
        state.listingSearchPending = false
      })
  }
})

export const { setLocationSearchField, resetListings } = listingSearchSlice.actions

// The function below is called a selector and allows us to select a value from the state. Selectors can also be defined
// inline where they're used instead of in the slice file. For example: `useSelector((state: RootState) =>
// state.counter.value)`
export const selectLocationSearchField = (state: AppState): string => {
  return state.listingSearch.location_search_field
}

export const selectListings = (state: AppState): Listing[] =>
  state.listingSearch.searchListingsResponse?.result_list ?? []

export const selectPriceRangeParams = (state: AppState) =>
  pick(state.listingSearch.searchParams, ['pricemin', 'pricemax'])

export const selectBedBathParams = (state: AppState) =>
  pick(state.listingSearch.searchParams, ['bed_min', 'bath_min'])

export const selectMoreFiltersParams = (state: AppState) => {
  return omit(state.listingSearch.searchParams, [
    'agent_uuid',
    'pgsize',
    'pricemin',
    'pricemax',
    'bed_min',
    'bath_min'
  ])
}

export const centerLatLonParams = (location: google.maps.LatLngLiteral) => {
  const { lat, lng } = location
  return { center_lat: lat, center_lon: lng }
}

export const boundsParams = (bounds: google.maps.LatLngBoundsLiteral) => {
  const { north, east, south, west } = bounds
  return {
    bounds_north: north,
    bounds_east: east,
    bounds_south: south,
    bounds_west: west
  }
}

export const listingServiceParams = (state: AppState) => {
  return {
    ...state.listingSearch.searchParams,
    ...centerLatLonParams(state.places.geocoderResult.location),
    ...boundsParams(state.listingMap.mapData.bounds),
    agent_uuid: state.environment.agent_uuid,
    geotype: selectGeoType(state)
  }
}

// modify params by adding, removing or changing params based on the values of other params, or the app's state  
export const modifyParams = (state: AppState, originalParams: object) => {
  return Object.keys(originalParams).reduce((params, param) => {
     // @ts-ignore
    return { ...params, ...modifyParam[param]?.(state, params) }
  }, originalParams)
}

// TODO: maybe should remove undefined as well
// remove falsey params (usually null)
export const removeUnecessaryParams = (params: object) => omitBy(params, (value, param) => value === null)

export const selectSearchParams = (state: AppState) => {
  const originalParams = listingServiceParams(state)
  const modifiedParams = modifyParams(state, originalParams)
  return removeUnecessaryParams(modifiedParams)
}

export default listingSearchSlice.reducer
