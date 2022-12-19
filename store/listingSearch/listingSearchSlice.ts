import type { AppState } from '..'
import type { Listing } from '../../lib/types/listing_types'
import type { PriceRangeParams } from '../../lib/listing_service_params_types'
import type {
  SortById,
  FilterParams,
  ListingServiceParams,
  FilterParamsPartial,
  CenterLatLonParams,
  BoundsParams,
  BedsBathsParam,
  MoreFiltersParams
} from '../../lib/listing_service_params_types'
import type { ModifyParams } from '../../lib/listing_service_params'
import type { Pagination } from '../../components/listings/ListingResultsPagination/ListingResultsPagination'
import omitBy from 'lodash/omitBy'
import range from 'lodash/range'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DefaultFilterParams } from '../../lib/listing_service_params'
import {
  PropertyTypeIDArray,
  RentalPropertytypeID,
  DefaultPropertyTypes
} from '../../lib/property_types'
import { modifyParam } from '../../lib/listing_service_params'
import { selectGeoType } from '../places/placesSlice'
import http from '../../lib/http'

export const SearchTypes = {
  Buy: 1,
  Rent: 2,
  Sold: 3
} as const

export type SearchTypeOption = typeof SearchTypes[keyof typeof SearchTypes]

export type PopupListing = Listing | null

export interface ListingSearchState {
  searchType: SearchTypeOption
  doListingSearchOnMapIdle: boolean
  listingSearchRunning: boolean
  location_search_field: string
  searchListingsResponse: any
  popupListing: PopupListing
  propertyTypes: PropertyTypeIDArray
  filterParams: FilterParams
}

const initialState: ListingSearchState = {
  searchType: SearchTypes.Buy,
  doListingSearchOnMapIdle: false,
  listingSearchRunning: false,
  location_search_field: '',
  searchListingsResponse: {},
  popupListing: null,
  propertyTypes: DefaultPropertyTypes,
  filterParams: DefaultFilterParams
}

// performs a geospatial search using just the "street" param. we use the text that was entered in the search field for
// the this param. with this method the service takes care of getting all the geospatial data we need to find the
// listings. first, it geocodes the place text that was passed in the street param using google's geocoder service. then
// it uses the geocoder response to get the appropriate geotype. next, it gets the boundary layer from our database
// using the lat/lng, and geotype from the geocoder response. finally, it searches for listings in our databse which
// have coordinates that are inside that boundary layer. the resulting response from the service includes the listings
// and the boundary so we can draw them on the map, but it also includes the geocoder response so we can make further
// requests for the current location using the center_lat, center_lon & geotype that were provided by the geocoder.
export const doGeospatialGeocodeSearch = createAsyncThunk(
  'listingSearch/doGeospatialGeocodeSearch',
  async (_arg, { getState }) => {
    // typescript doesn't know the type of our redux state that's returned so we have to set it as AppState
    const state = getState() as AppState
    const response = await http({
      url: '/api/listing',
      params: selectParamsForGeospatialGeocodeSearch(state)
    })
    // The value we return becomes the `fulfilled` action payload in extraReducers below
    return response.data.data
  }
)

// performs a geospatial search by passing the center_lat, center_lon & all bounds params. we would want to use this
// request if the place that was entered in the search field has already been geocoded. usually, we would perform the
// initial search using the doGeospatialGeocodeSearch() action, which has the service geocode the location and return it
// in the response. then we would use this for requests, such as if the user dragged the map or changes the filters.
// since we have the geocoder response data stored from the previous request we can just pass it directly to the service
// instead of having the service geocode the place for us again.
export const doGeospatialSearch = createAsyncThunk(
  'listingSearch/doGeospatialSearch',
  async (_arg, { getState }) => {
    const state = getState() as AppState
    const params = state.listingMap.boundaryActive
      ? selectParamsForGeospatialSearch(state)
      : selectParamsForBoundsSearch
    const response = await http({
      url: '/api/listing',
      params
    })
    return response.data.data
  }
)

export const searchWithUpdatedFilters = createAsyncThunk(
  'listingSearch/searchWithUpdatedParams',
  async (_args, { dispatch }) => {
    dispatch(resetStartIndex())
    dispatch(doGeospatialSearch())
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
          state.filterParams.status = 'active'
          state.propertyTypes = initialState.propertyTypes
          break
        case SearchTypes.Rent:
          state.filterParams.status = 'active'
          // for some reason rental is considered a property type in our system
          state.propertyTypes = [RentalPropertytypeID]
          break
        case SearchTypes.Sold:
          state.propertyTypes = initialState.propertyTypes
          state.filterParams.status = 'sold'
      }
    },

    setLocationSearchField: (state, action: PayloadAction<string>) => {
      state.location_search_field = action.payload
    },

    setPopupListing: (state, action: PayloadAction<PopupListing>) => {
      state.popupListing = action.payload
    },

    resetStartIndex: (state) => {
      state.filterParams.startidx = initialState.filterParams.startidx
    },

    setDoListingSearchOnMapIdle: (state, action: PayloadAction<boolean>) => {
      state.doListingSearchOnMapIdle = action.payload
    },

    setFilterParams: (state, action: PayloadAction<FilterParamsPartial>) => {
      state.filterParams = { ...state.filterParams, ...action.payload }
    },

    setPropertyTypes: (state, action: PayloadAction<PropertyTypeIDArray>) => {
      state.propertyTypes = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(doGeospatialGeocodeSearch.pending, (state) => {
      state.filterParams.startidx = initialState.filterParams.startidx
      state.listingSearchRunning = true
    })

    builder.addCase(doGeospatialGeocodeSearch.fulfilled, (state, action) => {
      state.searchListingsResponse = action.payload
      state.listingSearchRunning = false
      if (action.payload.number_returned === 0) {
        console.debug(
          'In doGeospatialGeocodeSearch.fulfilled, payload.number_returned is 0.'
        )
      }
    })

    builder.addCase(doGeospatialGeocodeSearch.rejected, (state) => {
      state.listingSearchRunning = false
    })

    builder.addCase(doGeospatialSearch.pending, (state) => {
      state.listingSearchRunning = true
    })

    builder.addCase(doGeospatialSearch.fulfilled, (state, action) => {
      state.listingSearchRunning = false
      state.searchListingsResponse = action.payload
      if (action.payload.number_returned === 0) {
        console.debug(
          'In doGeospatialSearch.fulfilled, payload.number_returned is 0.'
        )
      }
    })

    builder.addCase(doGeospatialSearch.rejected, (state) => {
      state.listingSearchRunning = false
    })
  }
})

export const {
  setSearchType,
  setLocationSearchField,
  setPopupListing,
  resetStartIndex,
  setDoListingSearchOnMapIdle,
  setFilterParams,
  setPropertyTypes
} = listingSearchSlice.actions

export const selectSearchType = (state: AppState) =>
  state.listingSearch.searchType

// The function below is called a selector and allows us to select a value from the state. Selectors can also be defined
// inline where they're used instead of in the slice file. For example: `useSelector((state: RootState) =>
// state.counter.value)`
export const selectLocationSearchField = (state: AppState): string => {
  return state.listingSearch.location_search_field
}

export const selectPopupListing = (state: AppState): PopupListing => {
  return state.listingSearch.popupListing
}

export const selectListings = (state: AppState): Listing[] =>
  state.listingSearch.searchListingsResponse?.result_list ?? []

export const selectPriceRange = (state: AppState): PriceRangeParams => {
  const { pricemin, pricemax } = state.listingSearch.filterParams
  return { pricemin, pricemax }
}

export const selectBedBathParams = (state: AppState): BedsBathsParam => {
  const { bed_min, bath_min } = state.listingSearch.filterParams
  return { bed_min, bath_min }
}

export const selectMoreFiltersParams = (state: AppState): MoreFiltersParams => {
  const { ex_cs, ex_pend, sqft_min, sqft_max, lotsize_min } =
    state.listingSearch.filterParams
  return { ex_cs, ex_pend, sqft_min, sqft_max, lotsize_min }
}

export const selectDoListingSearchOnMapIdle = (state: AppState) =>
  state.listingSearch.doListingSearchOnMapIdle

export const selectListingSearchRunning = (state: AppState) =>
  state.listingSearch.listingSearchRunning

export const selectCenterLatLonParams = (
  state: AppState
): CenterLatLonParams => {
  const { lat, lng } = state.places.geocoderResult.location
  return { center_lat: lat, center_lon: lng }
}

export const selectBoundsParams = (state: AppState): BoundsParams => {
  const { north, east, south, west } = state.listingMap.mapData.bounds
  return {
    bounds_north: north,
    bounds_east: east,
    bounds_south: south,
    bounds_west: west
  }
}

export const selectPropertyTypes = (state: AppState): PropertyTypeIDArray =>
  state.listingSearch.propertyTypes

export const selectPtype = (state: AppState): string | null => {
  return state.listingSearch.propertyTypes.join(',') || null
}

export const selectSortBy = (state: AppState): SortById =>
  state.listingSearch.filterParams.sort_by

export const selectPagination = (state: AppState): Pagination => {
  const { startidx, pgsize } = state.listingSearch.filterParams
  const { number_returned, number_found } =
    state.listingSearch.searchListingsResponse
  return {
    start: startidx + 1,
    end: startidx + number_returned ?? 0,
    total: number_found ?? 0,
    pages: range(0, number_found, pgsize),
    currentPage: startidx,
    pageSize: pgsize
  }
}

// modify params by adding, removing or changing params based on the values of other params, or the app's state
export const modifyParams = (
  state: AppState,
  originalParams: ListingServiceParams
) => {
  return Object.keys(originalParams).reduce((params, paramName) => {
    return {
      ...params,
      ...modifyParam[paramName as ModifyParams]?.(state, params)
    }
  }, originalParams)
}

export const removeUnecessaryParams = (params: ListingServiceParams) =>
  omitBy(params, (value, _param) => value === null)

export const selectListingServiceFilters = (state: AppState) => {
  return removeUnecessaryParams({
    ...state.listingSearch.filterParams,
    ptype: selectPtype(state),
    company_uuid: state.environment.company_uuid
  })
}

// if the boundary is active we do a normal geospatial search, which requires center lat/lng and geotype. the geotype
// param is what restricts the results to the geospatial boundary.
export const selectParamsForGeospatialSearch = (
  state: AppState
): ListingServiceParams => {
  const originalParams = {
    ...selectListingServiceFilters(state),
    ...selectCenterLatLonParams(state),
    ...selectBoundsParams(state),
    geotype: selectGeoType(state)
  }
  return modifyParams(state, originalParams)
}

// if it's not active we just do a bounds search instead. in that case excluding geotype returns all listings within the
// map's viewport bounds.
export const selectParamsForBoundsSearch = (
  state: AppState
): ListingServiceParams => {
  const originalParams = {
    ...selectListingServiceFilters(state),
    ...selectBoundsParams(state)
  }
  return modifyParams(state, originalParams)
}

// TODO: make this a memoized selector with createSelector
export const selectParamsForGeospatialGeocodeSearch = (
  state: AppState
): ListingServiceParams => {
  const originalParams = {
    ...selectListingServiceFilters(state),
    street: state.listingSearch.location_search_field
  }
  return modifyParams(state, originalParams)
}

export default listingSearchSlice.reducer
