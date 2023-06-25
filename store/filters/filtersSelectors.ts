import type { AppState } from '..'
import type { PropertyType } from '../../lib/property_types'
import type {
  PriceRangeFilters,
  BedsAndBathsFilters,
  SquareFeetRangeFilters,
  YearBuiltRangeFilters,
  SoldDaysFilter,
  SortFilters,
  MoreFilters,
  FeatureFilters,
  FiltersState
} from './filtersTypes'
import pick from 'lodash/pick'
import omit from 'lodash/omit'
import omitBy from 'lodash/omitBy'
import isEqual from 'lodash/isEqual'
import { initialState } from './filtersSlice'

export const selectSearchType = (state: AppState) => state.filters.searchType

export const selectLocationSearchField = (state: AppState): string => {
  return state.filters.locationSearchField
}

export const selectPriceRange = (state: AppState): PriceRangeFilters =>
  pick(state.filters, ['priceMin', 'priceMax'])

export const selectBedBathFilters = (state: AppState): BedsAndBathsFilters =>
  pick(state.filters, ['bedsMin', 'bathsMin'])

export const selectMoreFiltersParams = (state: AppState): MoreFilters => {
  return pick(state.filters, [
    'sqftMin',
    'sqftMax',
    'lotSizeMin',
    'yearBuiltMin',
    'yearBuiltMax',
    'waterfront',
    'view',
    'fireplace',
    'basement',
    'garage',
    'newConstruction',
    'pool',
    'airConditioning',
    'soldInLast'
  ])
}

export const selectOpenHouse = (state: AppState): boolean =>
  state.filters.openHouse

export const selectIncludePending = (state: AppState): boolean =>
  state.filters.includePending

export const selectSquareFeetRange = (
  state: AppState
): SquareFeetRangeFilters => pick(state.filters, ['sqftMin', 'sqftMax'])

export const selectYearBuiltRange = (state: AppState): YearBuiltRangeFilters =>
  pick(state.filters, ['yearBuiltMin', 'yearBuiltMax'])

export const selectFeatures = (state: AppState): FeatureFilters => {
  return pick(state.filters, [
    'waterfront',
    'view',
    'fireplace',
    'basement',
    'garage',
    'newConstruction',
    'pool',
    'airConditioning'
  ])
}

export const selectSoldDaysParam = (state: AppState): SoldDaysFilter =>
  pick(state.filters, ['soldInLast'])

export const selectPropertyTypes = (state: AppState): PropertyType[] =>
  state.filters.propertyTypes

export const selectSortBy = (state: AppState): SortFilters =>
  pick(state.filters, ['sortBy', 'sortDirection'])

export const selectFiltersForListingSearchParams = (
  state: AppState
): Partial<FiltersState> => {
  const includedFilters = omit(
    state.filters,
    'locationSearchField',
    'pageSize',
    'sortDirection',
    'soldInLast'
  )
  const filtersStateDiff = omitBy(
    includedFilters,
    (value, param) => value === null || isEqual(initialState[param], value)
  )
  // we always want to include locationSearchField, regardless of whether it's the same. otherwise we will end up with
  // an empty location in our url
  filtersStateDiff.locationSearchField = state.filters.locationSearchField
  return filtersStateDiff
}

export const selectListingSearchParams = (
  state: AppState
): Partial<FiltersState> => {
  return selectFiltersForListingSearchParams(state)
}
