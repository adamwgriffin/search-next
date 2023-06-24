import type { AppState } from '../store'
import type { BoundsParams } from './types/listing_service_params_types'
import type { ListingServiceParams } from './types/listing_service_params_types'
import type { FiltersState } from '../store/filters/filtersTypes'
import omit from 'lodash/omit'
import omitBy from 'lodash/omitBy'
import snakeCase from 'lodash/snakeCase'
import { SearchTypes } from '../store/filters/filtersSlice'

// FilterState attributes that have the same key/value as their listing service param counterpart (only with camel case
// keys)
export type ListingServiceParamFilters = Omit<
  FiltersState,
  | 'searchType'
  | 'locationSearchField'
  | 'propertyTypes'
  | 'openHouse'
  | 'includePending'
>

// keep track of a subset of listing param defaults so that we can avoid sending them in the request if the service
// would behave this way be default anyway
export const DefaultListingServiceParams: ListingServiceParams = Object.freeze({
  page_index: 0,
  page_size: 20,
  price_min: 0,
  beds_min: 0,
  baths_min: 0,
  sort_by: 'listedDate',
  sort_direction: 'desc'
})

export const BooleanParams = [
  'waterfront',
  'view',
  'fireplace',
  'basement',
  'garage',
  'new_construction',
  'virtual_tour',
  'pool',
  'air_conditioning'
]

export const selectBoundsParams = (state: AppState): BoundsParams => {
  const { north, east, south, west } = state.listingMap.mapData.bounds
  return {
    bounds_north: north,
    bounds_east: east,
    bounds_south: south,
    bounds_west: west
  }
}

export const selectListingServiceParamFilters = (
  state: AppState
): ListingServiceParamFilters => {
  return omit(
    state.filters,
    'searchType',
    'locationSearchField',
    'propertyTypes',
    'openHouse',
    'includePending'
  )
}

export const convertListingServiceFilterKeys = (
  filters: ListingServiceParamFilters
) => {
  return Object.entries(filters).reduce(
    (params: ListingServiceParams, [key, value]) => {
      params[snakeCase(key)] = value
      return params
    },
    {}
  )
}

// we want to avoid including params that have a boolean value that is false in most circumstances because we really
// only care about filtering on those that are true
export const falseBooleanParam = (param: string, value: unknown): boolean => {
  return BooleanParams.includes(param) && value === false
}

export const removeUnecessaryParams = (
  params: ListingServiceParams
): ListingServiceParams => {
  return omitBy(params, (value, param) => {
    return (
      value === null ||
      DefaultListingServiceParams[param] === value ||
      falseBooleanParam(param, value)
    )
  })
}

// adds additional listing service params based on certain filter state values
export const paramsDerivedFromFilterState = (filters: FiltersState) => {
  const params: ListingServiceParams = {}
  if (filters.propertyTypes.length) {
    params.property_type = filters.propertyTypes.join(',')
  }
  if (filters.openHouse) {
    params.open_house_after = new Date().toISOString()
  }
  if (filters.searchType === SearchTypes.Buy && filters.includePending) {
    params.status = 'active,pending'
  }
  if (filters.searchType === SearchTypes.Rent) {
    params.rental = true
  }
  if (filters.searchType === SearchTypes.Sold) {
    params.status = 'sold'
    params.sold_in_last = filters.soldInLast
  }
  return params
}

export const selectListingServiceFilters = (state: AppState) => {
  const listingServiceParams = convertListingServiceFilterKeys(
    selectListingServiceParamFilters(state)
  )
  return {
    ...removeUnecessaryParams(listingServiceParams),
    ...paramsDerivedFromFilterState(state.filters)
  }
}

export const selectParamsForGeospatialSearch = (
  state: AppState
): ListingServiceParams => {
  return {
    ...selectListingServiceFilters(state),
    ...selectBoundsParams(state)
  }
}

export const selectParamsForGeocodeSearch = (
  state: AppState
): ListingServiceParams => {
  return {
    ...selectListingServiceFilters(state),
    address: state.filters.locationSearchField
  }
}
