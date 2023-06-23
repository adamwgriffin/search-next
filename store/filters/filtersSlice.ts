import type { AppState } from '..'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { PropertyType } from '../../lib/property_types'
import pick from 'lodash/pick'
import { createSlice } from '@reduxjs/toolkit'
import { searchNewLocation } from '../listingSearch/listingSearchSlice'
import {
  FiltersState,
  SearchTypeOption,
  PriceRangeFilters,
  BedsAndBathsFilters,
  SquareFeetRangeFilters,
  YearBuiltRangeFilters,
  SoldDaysFilter,
  SortFilters
} from './filtersTypes'

export const DefaultSoldInLast = 730 // 2 years in days

export const SearchTypes = {
  Buy: 'buy',
  Rent: 'rent',
  Sold: 'sold'
} as const

const initialState: FiltersState = {
  searchType: SearchTypes.Buy,
  locationSearchField: 'Fremont, Seattle, WA, USA',
  propertyTypes: [],
  includePending: false,
  openHouse: false,
  pageIndex: 0,
  pageSize: 20,
  priceMin: null,
  priceMax: null,
  bedsMin: 0,
  bathsMin: 0,
  sqftMin: null,
  sqftMax: null,
  sortBy: 'listedDate',
  sortDirection: 'desc',
  lotSizeMin: null,
  yearBuiltMin: null,
  yearBuiltMax: null,
  waterfront: false,
  view: false,
  fireplace: false,
  basement: false,
  garage: false,
  newConstruction: false,
  virtualTour: false,
  pool: false,
  airConditioning: false,
  soldInLast: null
}

export const filtersSlice = createSlice({
  name: 'filters',

  initialState,

  reducers: {
    setFilters: (state, action: PayloadAction<Partial<FiltersState>>) => {
      // we have to return the object in order to replace the entire state
      return { ...state, ...action.payload }
    },

    setSearchType: (state, action: PayloadAction<SearchTypeOption>) => {
      state.searchType = action.payload
      switch (action.payload) {
        case SearchTypes.Sold:
          state.openHouse = false
          state.soldInLast = DefaultSoldInLast
          break
        case SearchTypes.Rent:
          state.openHouse = false
          state.soldInLast = null
          break
        case SearchTypes.Buy:
          state.soldInLast = null
          break
      }
    },

    resetStartIndex: (state) => {
      state.pageIndex = initialState.pageIndex
    },

    clearFilters: () => {
      return initialState
    }
  },

  extraReducers: (builder) => {
    builder.addCase(searchNewLocation.pending, (state) => {
      state.pageIndex = initialState.pageIndex
    })
  }
})

export const { setFilters, setSearchType, resetStartIndex, clearFilters } =
  filtersSlice.actions

export const selectSearchType = (state: AppState) => state.filters.searchType

// The function below is called a selector and allows us to select a value from the state. Selectors can also be defined
// inline where they're used instead of in the slice file. For example: `useSelector((state: RootState) =>
// state.counter.value)`
export const selectLocationSearchField = (state: AppState): string => {
  return state.filters.locationSearchField
}

export const selectPriceRange = (state: AppState): PriceRangeFilters =>
  pick(state.filters, ['priceMin', 'priceMax'])

export const selectBedBathFilters = (state: AppState): BedsAndBathsFilters =>
  pick(state.filters, ['bedsMin', 'bathsMin'])

export type MoreFilters = Pick<
  FiltersState,
  | 'sqftMin'
  | 'sqftMax'
  | 'lotSizeMin'
  | 'yearBuiltMin'
  | 'yearBuiltMax'
  | 'waterfront'
  | 'view'
  | 'fireplace'
  | 'basement'
  | 'garage'
  | 'newConstruction'
  | 'pool'
  | 'airConditioning'
  | 'soldInLast'
>

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

export type FeatureFilters = Pick<
  FiltersState,
  | 'waterfront'
  | 'view'
  | 'fireplace'
  | 'basement'
  | 'garage'
  | 'newConstruction'
  | 'pool'
  | 'airConditioning'
>

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

export default filtersSlice.reducer
