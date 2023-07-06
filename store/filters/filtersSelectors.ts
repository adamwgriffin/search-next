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
import { createSelector } from '@reduxjs/toolkit'
import pick from 'lodash/pick'
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

export const selectSearchState = createSelector(
  (state: AppState) => state.filters,
  (state: FiltersState): Partial<FiltersState> => {
    return omitBy(state, (value, key) => {
      // always include locationSearchField as long as it has a value
      if (key === 'locationSearchField' && value) {
        return false
      }
      return value === null ||
        ['pageSize'].includes(key) ||
        isEqual(initialState[key], value)
    })
  }
)
