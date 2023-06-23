import type {
  SortDirection,
  SortType
} from '../../lib/types/listing_service_params_types'
import type { PropertyType } from '../../lib/property_types'
import { SearchTypes } from './filtersSlice'


export type SearchTypeOption = (typeof SearchTypes)[keyof typeof SearchTypes]

export interface FiltersState {
  searchType: SearchTypeOption
  locationSearchField: string
  propertyTypes: PropertyType[]
  includePending: boolean
  openHouse: boolean
  pageIndex: number
  pageSize: number
  priceMin: number | null
  priceMax: number | null
  bedsMin: number | null
  bathsMin: number | null
  sqftMin: number | null
  sqftMax: number | null
  sortBy: SortType
  sortDirection: SortDirection
  lotSizeMin: number | null
  yearBuiltMin: number | null
  yearBuiltMax: number | null
  waterfront: boolean
  view: boolean
  fireplace: boolean
  basement: boolean
  garage: boolean
  newConstruction: boolean
  virtualTour: boolean
  pool: boolean
  airConditioning: boolean
  soldInLast: number | null
  [key: string]: any
}

export type PriceRangeFilters = Pick<FiltersState, 'priceMin' | 'priceMax'>

export type BedsAndBathsFilters = Pick<FiltersState, 'bedsMin' | 'bathsMin'>

export type SquareFeetRangeFilters = Pick<FiltersState, 'sqftMin' | 'sqftMax'>

export type LotSizeFilter = Pick<FiltersState, 'lotSizeMin'>

export type YearBuiltRangeFilters = Pick<
  FiltersState, 'yearBuiltMin' | 'yearBuiltMax'
>

export type SortFilters = Pick<FiltersState, 'sortBy' | 'sortDirection'>

export type SoldDaysFilter = Pick<FiltersState, 'soldInLast'>

export type FeaturesFilters = Pick<
  FiltersState, 'waterfront' |
  'view' |
  'fireplace' |
  'basement' |
  'garage' |
  'newConstruction' |
  'pool' |
  'airConditioning'
>
