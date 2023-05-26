import type { AppState } from '..'
import type { Listing } from '../../lib/types/listing_types'
import type {
  PriceRangeParams,
  SortParams
} from '../../lib/types/listing_service_params_types'
import type {
  FilterParams,
  ListingServiceParams,
  FilterParamsPartial,
  CenterLatLonParams,
  BoundsParams,
  BedsBathsParam,
  MoreFiltersParams,
  SquareFeetRangeParams,
  LotSizeParams,
  YearBuiltRangeParams,
  OpenHouseParam,
  FeaturesParams,
  SoldDaysParam
} from '../../lib/types/listing_service_params_types'
import {
  DefaultListingServiceParams,
  ModifyParams
} from '../../lib/listing_service_params'
import type { Pagination } from '../../components/listings/ListingResultsPagination/ListingResultsPagination'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { PropertyType } from '../../lib/property_types'
import pick from 'lodash/pick'
import omitBy from 'lodash/omitBy'
import range from 'lodash/range'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { DefaultFilterParams } from '../../lib/listing_service_params'
import { modifyParam } from '../../lib/listing_service_params'
import { selectGeoType } from '../places/placesSlice'
import http from '../../lib/http'

export const SearchTypes = {
  Buy: 1,
  Rent: 2,
  Sold: 3
} as const

export type SearchTypeOption = (typeof SearchTypes)[keyof typeof SearchTypes]

export type SelectedListing = string | null

export type HighlightedMarker = string | null

export interface ListingSearchState {
  searchType: SearchTypeOption
  doListingSearchOnMapIdle: boolean
  listingSearchRunning: boolean
  locationSearchField: string
  searchListingsResponse: any
  selectedListing: SelectedListing
  highlightedMarker: HighlightedMarker
  propertyTypes: PropertyType[]
  includePending: boolean
  filterParams: FilterParams
}

const initialState: ListingSearchState = {
  searchType: SearchTypes.Buy,
  doListingSearchOnMapIdle: false,
  listingSearchRunning: false,
  locationSearchField: 'Fremont, Seattle, WA, USA',
  searchListingsResponse: {},
  selectedListing: null,
  highlightedMarker: null,
  propertyTypes: [],
  includePending: false,
  filterParams: DefaultFilterParams
}

// performs a geospatial search using just the "street" param. we use the text that was entered in the search field for
// the this param. with this method the service takes care of getting all the geospatial data we need to find the
// listings. first, it geocodes the place text that was passed in the street param using google's geocoder service. then
// it uses the geocoder response to get the appropriate geotype. next, it gets the boundary layer from our database
// using the lat/lng, and geotype from the geocoder response. finally, it searches for listings in our databse which
// have coordinates that are inside that boundary layer. the resulting response from the service includes the listings
// and the boundary so we can draw them on the map, but it also includes the geocoder response so we can make further
// requests for the current location using the center_lat, lng & geotype that were provided by the geocoder.
export const doGeospatialGeocodeSearch = createAsyncThunk(
  'listingSearch/doGeospatialGeocodeSearch',
  async (_arg, { getState }) => {
    // typescript doesn't know the type of our redux state that's returned so we have to set it as AppState
    const state = getState() as AppState
    const response = await http({
      url: '/api/listing/search/geocode',
      params: selectParamsForGeospatialGeocodeSearch(state)
    })
    // The value we return becomes the `fulfilled` action payload in extraReducers below
    return response.data
  }
)

// performs a geospatial search by passing the lat, lng & all bounds params. we would want to use this request if the
// place that was entered in the search field has already been geocoded. usually, we would perform the initial search
// using the doGeospatialGeocodeSearch() action, which has the service geocode the location and return it in the
// response. then we would use this for requests, such as if the user dragged the map or changes the filters. since we
// have the geocoder response data stored from the previous request we can just pass it directly to the service instead
// of having the service geocode the place for us again.
export const doGeospatialSearch = createAsyncThunk(
  'listingSearch/doGeospatialSearch',
  async (_arg, { getState }) => {
    const state = getState() as AppState

    const params = state.listingMap.boundaryActive
      ? selectParamsForGeospatialSearch(state)
      : selectParamsForBoundsSearch(state)

    const url = state.listingMap.boundaryActive
      ? `/api/listing/search/boundary/${state.listingSearch.searchListingsResponse.boundary._id}`
      : `api/listing/search/bounds`

    const response = await http({ url, params })

    return response.data
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
          state.filterParams.property_type =
            initialState.filterParams.property_type
          break
        case SearchTypes.Rent:
          // TBD
          break
        case SearchTypes.Sold:
          state.filterParams.property_type =
            initialState.filterParams.property_type
      }
    },

    setLocationSearchField: (state, action: PayloadAction<string>) => {
      state.locationSearchField = action.payload
    },

    setSelectedListing: (state, action: PayloadAction<SelectedListing>) => {
      state.selectedListing = action.payload
    },

    setHighlightedMarker: (state, action: PayloadAction<HighlightedMarker>) => {
      state.highlightedMarker = action.payload
    },

    resetStartIndex: (state) => {
      state.filterParams.page_index = initialState.filterParams.page_index
    },

    setDoListingSearchOnMapIdle: (state, action: PayloadAction<boolean>) => {
      state.doListingSearchOnMapIdle = action.payload
    },

    setFilterParams: (state, action: PayloadAction<FilterParamsPartial>) => {
      state.filterParams = { ...state.filterParams, ...action.payload }
    },

    setPropertyTypes: (state, action: PayloadAction<PropertyType[]>) => {
      state.propertyTypes = action.payload
    },

    setIncludePending: (state, action: PayloadAction<boolean>) => {
      state.includePending = action.payload
    },

    clearFilters: (state) => {
      state.filterParams = initialState.filterParams
      state.propertyTypes = initialState.propertyTypes
      state.includePending = initialState.includePending
    }
  },

  extraReducers: (builder) => {
    builder.addCase(doGeospatialGeocodeSearch.pending, (state) => {
      state.filterParams.page_index = initialState.filterParams.page_index
      state.listingSearchRunning = true
    })

    builder.addCase(doGeospatialGeocodeSearch.fulfilled, (state, action) => {
      state.searchListingsResponse = action.payload
      state.listingSearchRunning = false
    })

    builder.addCase(doGeospatialGeocodeSearch.rejected, (state) => {
      state.listingSearchRunning = false
    })

    builder.addCase(doGeospatialSearch.pending, (state) => {
      state.listingSearchRunning = true
    })

    builder.addCase(doGeospatialSearch.fulfilled, (state, action) => {
      state.listingSearchRunning = false
      // just update the parts that would change with this type of search. the initial search would have set boundary
      // and geocoderResult attributes that we don't want to overwite
      state.searchListingsResponse.listings = action.payload.listings
      state.searchListingsResponse.pagination = action.payload.pagination
    })

    builder.addCase(doGeospatialSearch.rejected, (state) => {
      state.listingSearchRunning = false
    })
  }
})

export const {
  setSearchType,
  setLocationSearchField,
  setSelectedListing,
  setHighlightedMarker,
  resetStartIndex,
  setDoListingSearchOnMapIdle,
  setFilterParams,
  setPropertyTypes,
  setIncludePending,
  clearFilters
} = listingSearchSlice.actions

export const selectSearchType = (state: AppState) =>
  state.listingSearch.searchType

// The function below is called a selector and allows us to select a value from the state. Selectors can also be defined
// inline where they're used instead of in the slice file. For example: `useSelector((state: RootState) =>
// state.counter.value)`
export const selectLocationSearchField = (state: AppState): string => {
  return state.listingSearch.locationSearchField
}

export const selectPopupListing = (state: AppState): SelectedListing => {
  return state.listingSearch.selectedListing
}

export const selectHighlightedMarker = (state: AppState): HighlightedMarker =>
  state.listingSearch.highlightedMarker

export const selectListings = (state: AppState): Listing[] =>
  state.listingSearch.searchListingsResponse?.listings ?? []

export const selectPriceRange = (state: AppState): PriceRangeParams =>
  pick(state.listingSearch.filterParams, ['price_min', 'price_max'])

export const selectBedBathParams = (state: AppState): BedsBathsParam =>
  pick(state.listingSearch.filterParams, ['beds_min', 'baths_min'])

export const selectMoreFiltersParams = (state: AppState): MoreFiltersParams => {
  return pick(state.listingSearch.filterParams, [
    'sqft_min',
    'sqft_max',
    'lot_size_min',
    'year_built_min',
    'year_built_max',
    'openhouse',
    'waterfront',
    'view',
    'fireplace',
    'basement',
    'garage',
    'new_construction',
    'pool',
    'air_conditioning',
    'sold_in_last'
  ])
}

export const selectOpenHouseParam = (state: AppState): OpenHouseParam =>
  pick(state.listingSearch.filterParams, ['openhouse'])

export const selectIncludePending = (state: AppState): boolean =>
  state.listingSearch.includePending

export const selectSquareFeetParams = (
  state: AppState
): SquareFeetRangeParams =>
  pick(state.listingSearch.filterParams, ['sqft_min', 'sqft_max'])

export const selectLotSizeParams = (state: AppState): LotSizeParams =>
  pick(state.listingSearch.filterParams, ['lot_size_min'])

export const selectYearBuiltParams = (state: AppState): YearBuiltRangeParams =>
  pick(state.listingSearch.filterParams, ['year_built_min', 'year_built_max'])

export const selectFeatureParams = (state: AppState): FeaturesParams => {
  return pick(state.listingSearch.filterParams, [
    'waterfront',
    'view',
    'fireplace',
    'basement',
    'garage',
    'new_construction',
    'pool',
    'air_conditioning'
  ])
}

export const selectSoldDaysParam = (state: AppState): SoldDaysParam =>
  pick(state.listingSearch.filterParams, ['sold_in_last'])

export const selectDoListingSearchOnMapIdle = (state: AppState) =>
  state.listingSearch.doListingSearchOnMapIdle

export const selectListingSearchRunning = (state: AppState) =>
  state.listingSearch.listingSearchRunning

export const selectCenterLatLonParams = (
  state: AppState
): CenterLatLonParams => {
  const { lat, lng } = state.places.geocoderResult.location
  return { lat, lng }
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

export const selectPropertyTypes = (state: AppState): PropertyType[] =>
  state.listingSearch.propertyTypes

export const selectStatus = (state: AppState): string | null => {
  switch (state.listingSearch.searchType) {
    case SearchTypes.Buy:
      return state.listingSearch.includePending ? 'active,pending' : null
    case SearchTypes.Rent:
      return null
    case SearchTypes.Sold:
      return 'sold'
  }
}

export const selectSortBy = (state: AppState): SortParams =>
  pick(state.listingSearch.filterParams, ['sort_by', 'sort_direction'])

export const selectTotalListings = (state: AppState): number =>
  state.listingSearch.searchListingsResponse.number_found ?? 0

export const selectPagination = (state: AppState): Pagination => {
  const { page_index, page_size } = state.listingSearch.filterParams
  const numberReturned =
    state.listingSearch.searchListingsResponse?.listings?.length || 0
  const numberAvailable =
    state.listingSearch.searchListingsResponse?.pagination?.numberAvailable || 0
  const numberOfPages = Math.ceil(numberAvailable / page_size)
  return {
    start: page_index * page_size + 1,
    end: page_index * page_size + numberReturned,
    total: numberAvailable,
    pages: range(0, numberOfPages),
    currentPage: page_index
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

export const removeUnecessaryParams = (
  params: ListingServiceParams
): Partial<ListingServiceParams> =>
  omitBy(
    params,
    (value, param) =>
      value === null || DefaultListingServiceParams[param] === value
  )

export const selectListingServiceFilters = (state: AppState) => {
  return removeUnecessaryParams({
    ...state.listingSearch.filterParams,
    property_type: state.listingSearch.propertyTypes.join(',') || null,
    status: selectStatus(state)
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
    address: state.listingSearch.locationSearchField
  }
  return modifyParams(state, originalParams)
}

export default listingSearchSlice.reducer
