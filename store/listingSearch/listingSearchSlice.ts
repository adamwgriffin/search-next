import type { AppState } from '..'
import type { Listing } from '../../lib/types'
import type { PriceRangeParam } from '../../components/form/Price/Price'
import type {
  WebsitesSearchParamsInterface,
  BedsBathsParam,
  MoreFiltersParams
} from '../../lib/constants/search_param_constants'
import omitBy from 'lodash/omitBy'
import range from 'lodash/range'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WebsitesSearchParams } from '../../lib/constants/search_param_constants'
import { RentalPropertytypeID } from '../../lib/property_types'
import { modifyParam } from '../../lib/helpers/search_params'
import { geocodeMap, selectGeoType } from '../places/placesSlice'
import { setBoundaryActive, getGeoLayer } from '../listingMap/listingMapSlice'
import http from '../../lib/http'

export const SearchTypes = {
  Buy: 1,
  Rent: 2,
  Sold: 3
} as const

export type SearchTypeOption = typeof SearchTypes[keyof typeof SearchTypes]

export interface ListingSearchState {
  searchType: SearchTypeOption
  listingSearchPending: boolean
  location_search_field: string
  searchListingsResponse: any
  searchParams: WebsitesSearchParamsInterface
}

export interface MoreFiltersParamsUpdatePatch {
  ex_pend?: boolean
  ex_cs?: boolean
}

export interface SearchParamsUpdatePatch extends MoreFiltersParamsUpdatePatch {
  pricemin?: number | null
  pricemax?: number | null
  ptype?: number[]
  bed_min?: number
  bath_min?: number
  startidx?: number
}

const initialState: ListingSearchState = {
  searchType: SearchTypes.Buy,
  // "pending" in this context means it's waiting to be executed after the map "idle" event is triggered, not that the
  // request to the service is pending
  listingSearchPending: false,
  // "location_search_field" is a synonym for "street" in listing service. it is a valid search param but we don't
  // include it in "searchParams" because we are using it to geocode on the front end to get the center_lat & center_lon
  // coordinates. those coordinates are all that's really necessary to send the service if you already have them.
  location_search_field: '',
  searchListingsResponse: {},
  searchParams: WebsitesSearchParams
}

export const initiateListingSearch = createAsyncThunk(
  'listingSearch/initiateListingSearch',
  async (
    geocoderRequest: google.maps.GeocoderRequest | undefined,
    { dispatch, getState }
  ) => {
    dispatch(setBoundaryActive(true))
    const state = getState() as AppState
    const request = geocoderRequest ?
      geocoderRequest :
      { address: state.listingSearch.location_search_field }
    // gets goespatial data & assigns to state.placesgeocoderResult. have to use await here otherwise this finishes
    // after getGeoLayer and we get the previous location instead of the current one.
    await dispatch(geocodeMap(request))
    // getGeoLayer() uses the geospatial data that was assigned to state.places.geocoderResult after dispatching
    // geocodeMap() for the lat, lng & geotype params that it needs to get the layer (boundary) from the service
    await dispatch(getGeoLayer())
    dispatch(resetStartIndex())
    dispatch(resetListings())
    dispatch(setListingSearchPending(true))
  }
)

export const searchWithUpdatedFilters = createAsyncThunk(
  'listingSearch/searchWithUpdatedParams',
  async (_args, { dispatch }) => {
    dispatch(resetStartIndex())
    dispatch(resetListings())
    dispatch(searchListings())
  }
)

export const getNextPageOfListingResults = createAsyncThunk(
  'listingSearch/getNextPageOfListingResults',
  async (_args, { dispatch }) => {
    dispatch(resetListings())
    dispatch(searchListings())
  }
)

export const searchListings = createAsyncThunk(
  'listingSearch/searchListings',
  async (_arg, { getState }) => {
    // typescript doesn't know the type of our redux state that's returned so we have to set it as AppState
    const state = getState() as AppState
    const response = await http({
      url: '/api/listing',
      params: selectParamsForListingServiceCall(state)
    })
    // The value we return becomes the `fulfilled` action payload in extraReducers below
    return response.data.data
  }
)

export const listingSearchSlice = createSlice({
  name: 'listingSearch',

  initialState,

  reducers: {
    setSearchType: (state, action: PayloadAction<SearchTypeOption>) => {
      state.searchType = action.payload
      switch (action.payload) {
        case SearchTypes.Buy:
          state.searchParams.status = 'active'
          break
        case SearchTypes.Rent:
          state.searchParams.status = 'active'
          // for some reason rental is considered a property type in our system
          state.searchParams.ptype = [RentalPropertytypeID]
          break
        case SearchTypes.Sold:
          state.searchParams.status = 'sold'
      }
    },

    setLocationSearchField: (state, action: PayloadAction<string>) => {
      state.location_search_field = action.payload
    },

    resetStartIndex: (state) => {
      state.searchParams.startidx = initialState.searchParams.startidx
    },

    resetListings: (state) => {
      state.searchListingsResponse = initialState.searchListingsResponse
    },

    setListingSearchPending: (state, action: PayloadAction<boolean>) => {
      state.listingSearchPending = action.payload
    },

    setSearchParams: (
      state,
      action: PayloadAction<SearchParamsUpdatePatch>
    ) => {
      state.searchParams = { ...state.searchParams, ...action.payload }
    }
  },

  extraReducers: (builder) => {
    builder.addCase(searchListings.fulfilled, (state, action) => {
      state.listingSearchPending = false
      state.searchListingsResponse = action.payload
    })

    builder.addCase(searchListings.rejected, (state) => {
      state.listingSearchPending = false
    })
  }
})

export const {
  setSearchType,
  setLocationSearchField,
  resetStartIndex,
  resetListings,
  setListingSearchPending,
  setSearchParams
} = listingSearchSlice.actions

export const selectSearchType = (state: AppState) =>
  state.listingSearch.searchType

// The function below is called a selector and allows us to select a value from the state. Selectors can also be defined
// inline where they're used instead of in the slice file. For example: `useSelector((state: RootState) =>
// state.counter.value)`
export const selectLocationSearchField = (state: AppState): string => {
  return state.listingSearch.location_search_field
}

export const selectListings = (state: AppState): Listing[] =>
  state.listingSearch.searchListingsResponse?.result_list ?? []

export const selectPriceRange = (state: AppState): PriceRangeParam => {
  const { pricemin, pricemax } = state.listingSearch.searchParams
  return { pricemin, pricemax }
}

export const selectBedBathParams = (state: AppState): BedsBathsParam => {
  const { bed_min, bath_min } = state.listingSearch.searchParams
  return { bed_min, bath_min }
}

export const selectMoreFiltersParams = (state: AppState): MoreFiltersParams => {
  const { ex_cs, ex_pend } = state.listingSearch.searchParams
  return { ex_cs, ex_pend }
}

export const selectListingSearchPending = (state: AppState) =>
  state.listingSearch.listingSearchPending

export const selectCenterLatLonParams = (state: AppState) => {
  const { lat, lng } = state.places.geocoderResult.location
  return { center_lat: lat, center_lon: lng }
}

export const selectBoundsParams = (state: AppState) => {
  const { north, east, south, west } = state.listingMap.mapData.bounds
  return {
    bounds_north: north,
    bounds_east: east,
    bounds_south: south,
    bounds_west: west
  }
}

export const selectPropertyTypes = (state: AppState): number[] =>
  state.listingSearch.searchParams.ptype || []

export const selectAllListingServiceParams = (state: AppState) => {
  return {
    ...state.listingSearch.searchParams,
    ...selectCenterLatLonParams(state),
    ...selectBoundsParams(state),
    agent_uuid: state.environment.agent_uuid,
    geotype: selectGeoType(state)
  }
}

export const selectPagination = (state: AppState) => {
  const { startidx, pgsize } = state.listingSearch.searchParams
  const { number_returned, number_found } = state.listingSearch.searchListingsResponse
  return {
    start: (startidx + 1),
    end: (startidx + number_returned ?? 0),
    total: (number_found ?? 0),
    pages: range(0, number_found, pgsize),
    currentPage: startidx,
    pageSize: pgsize
  }
}

// modify params by adding, removing or changing params based on the values of other params, or the app's state
export const modifyParams = (state: AppState, originalParams: object) => {
  return Object.keys(originalParams).reduce((params, param) => {
    // @ts-ignore
    return { ...params, ...modifyParam[param]?.(state, params) }
  }, originalParams)
}

export const removeUnecessaryParams = (params: object) =>
  omitBy(
    params,
    (value, param) => typeof value === 'undefined' || value === null
  )

// TODO: make this a memoized selector with createSelector
export const selectParamsForListingServiceCall = (state: AppState) => {
  const originalParams = selectAllListingServiceParams(state)
  const modifiedParams = modifyParams(state, originalParams)
  return removeUnecessaryParams(modifiedParams)
}

export default listingSearchSlice.reducer
