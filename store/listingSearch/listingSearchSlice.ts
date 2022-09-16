import type { AppState } from '..'
import type { Listing } from '../../lib/types'
import type { PriceRangeParam } from '../../components/form/Price/Price'
import type { WebsitesSearchParamsInterface, BedsBathsParam } from '../../lib/constants/search_param_constants'
import omitBy from 'lodash/omitBy'
import omit from 'lodash/omit'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { searchListingsNonDedupe } from './listingSearchAPI'
import { WebsitesSearchParams } from '../../lib/constants/search_param_constants'
import { RentalPropertytypeID } from '../../lib/property_types'
import { modifyParam } from '../../lib/helpers/search_params'
import { selectBaseUrl } from '../environment/environmentSlice'
import { geocodeMap, selectGeoType } from '../places/placesSlice'
import { setBoundaryActive, getGeoLayer } from '../listingMap/listingMapSlice'

export const SearchTypes = {
  Buy: 1,
  Rent: 2,
  Sold: 3
} as const

export type SearchTypeOption = typeof SearchTypes[keyof typeof SearchTypes]

export interface ListingSearchState {
  searchType: SearchTypeOption
  listingsPageIndex: number
  cluster_threshold: number
  listingSearchPending: boolean
  location_search_field: string
  searchListingsResponse: any
  searchParams: WebsitesSearchParamsInterface
}

export interface SearchParamsUpdatePatch {
  pricemin?: number | null
  pricemax?: number | null
  ptype?: number[]
  bed_min?: number
  bath_min?: number
}

const initialState: ListingSearchState = {
  searchType: SearchTypes.Buy,
  listingsPageIndex: 0,
  // TODO: we probably will not even use cluster_threshold anymore. paging through small sets of listings is a better
  // user experince that clustering large sets IMO
  cluster_threshold: 200,
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
    dispatch(resetListings())
    // gets goespatial data & assigns to state.placesgeocoderResult. have to use await here otherwise this finishes
    // after getGeoLayer and we get the previous location instead of the current one.
    let request
    if (geocoderRequest) {
      request = geocoderRequest
    } else {
      const { listingSearch } = getState() as AppState
      request = { address: listingSearch.location_search_field }
    }
    await dispatch(geocodeMap(request))
    // getGeoLayer() uses the geospatial data that was assigned to geocoderResult above for the lat, lng & geotype
    // params that it needs to get the layer from the service (boundary)
    return await dispatch(getGeoLayer())
  }
)

export const searchWithUpdatedFilters = createAsyncThunk(
  'listingSearch/searchWithUpdatedParams',
  async (_args, { dispatch }) => {
    dispatch(setBoundaryActive(true))
    dispatch(resetListings())
    dispatch(searchListings())
  }
)

export const searchListings = createAsyncThunk(
  'listingSearch/searchListings',
  async (_arg, { getState }) => {
    // typescript doesn't know the type of our redux state that's returned so we have to set it as AppState
    const state = getState() as AppState
    const baseUrl = selectBaseUrl(state.environment)
    const response = await searchListingsNonDedupe(
      baseUrl,
      selectParamsForListingServiceCall(state)
    )
    // The value we return becomes the `fulfilled` action payload in extraReducers below
    return response.data
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
          break;
        case SearchTypes.Rent:
          state.searchParams.status = 'active'
          // for some reason rental is considered a property type in our system
          state.searchParams.ptype = [RentalPropertytypeID]
          break;
        case SearchTypes.Sold:
          state.searchParams.status = 'sold'
      }
    },

    setLocationSearchField: (state, action: PayloadAction<string>) => {
      state.location_search_field = action.payload
    },

    resetListings: (state) => {
      state.listingsPageIndex = initialState.listingsPageIndex
      state.searchListingsResponse = initialState.searchListingsResponse
    },

    setListingSearchPending: (state, action: PayloadAction<boolean>) => {
      state.listingSearchPending = action.payload
    },

    setSearchParams: (state, action: PayloadAction<SearchParamsUpdatePatch>) => {
      state.searchParams = { ...state.searchParams, ...action.payload }
    }
  },

  extraReducers: (builder) => {
    builder.addCase(initiateListingSearch.fulfilled, (state) => {
      state.listingSearchPending = true
    })

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
  return { pricemin, pricemax  }
}

export const selectBedBathParams = (state: AppState): BedsBathsParam => {
  const { bed_min, bath_min } = state.listingSearch.searchParams
  return { bed_min, bath_min }
}

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

export const selectListingSearchPending = (state: AppState) =>
  state.listingSearch.listingSearchPending

export const selectCenterLatLonParams = (
  centerlatLng: google.maps.LatLngLiteral
) => {
  const { lat, lng } = centerlatLng
  return { center_lat: lat, center_lon: lng }
}

export const selectBoundsParams = (bounds: google.maps.LatLngBoundsLiteral) => {
  const { north, east, south, west } = bounds
  return {
    bounds_north: north,
    bounds_east: east,
    bounds_south: south,
    bounds_west: west
  }
}

export const selectPropertyTypes = (state: AppState): number[] => state.listingSearch.searchParams.ptype || []

export const selectAllListingServiceParams = (state: AppState) => {
  return {
    ...state.listingSearch.searchParams,
    ...selectCenterLatLonParams(state.listingMap.mapData.center),
    ...selectBoundsParams(state.listingMap.mapData.bounds),
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
