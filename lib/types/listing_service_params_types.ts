export type SortType = 'listedDate' | 'listPrice' | 'beds' | 'baths' | 'sqft'

export type SortDirection = 'asc' | 'desc'

// listing service params that are used as filters. also used to maintain filter state in the app
export interface FilterParams {
  page_index: number
  page_size: number
  price_min: number | null
  price_max: number | null
  beds_min: number | null
  baths_min: number | null
  sqft_min: number | null
  sqft_max: number | null
  sort_by: SortType
  sort_direction: SortDirection
  lot_size_min: number | null
  year_built_min: number | null
  year_built_max: number | null
  open_house_after: string | null
  sold_in_last: number | null
  property_type: string | null
  status: string | null
  waterfront: boolean | null
  view: boolean | null
  fireplace: boolean | null
  basement: boolean | null
  garage: boolean | null
  new_construction: boolean | null
  pool: boolean | null
  air_conditioning: boolean | null
}

export type FilterParamsPartial = Partial<FilterParams>

// listing service params that are mostly only sent when composing a listing service request. these names aren't used in
// the app state much.
export interface ListingServiceParams extends FilterParamsPartial {
  lat?: number
  lng?: number
  bounds_north?: number
  bounds_east?: number
  bounds_south?: number
  bounds_west?: number
  address?: string
  rental?: boolean
  // Index signature, allows us to index like so: params['key']
  [key: string]: number | string | boolean | SortType | SortDirection | null | undefined | Date
}

export type CenterLatLonParams = Pick<
  ListingServiceParams,
  'lat' | 'lng'
>

export type BoundsParams = Pick<
  ListingServiceParams,
  'bounds_north' | 'bounds_east' | 'bounds_west' | 'bounds_south'
>

export type PriceRangeParams = Pick<FilterParams, 'price_min' | 'price_max'>

export type SquareFeetRangeParams = Pick<FilterParams, 'sqft_min' | 'sqft_max'>

export type LotSizeParams = Pick<FilterParams, 'lot_size_min'>

export type YearBuiltRangeParams = Pick<FilterParams, 'year_built_min' | 'year_built_max'>

export type SoldDaysParam = Pick<FilterParams, 'sold_in_last'>

export type FeaturesParams = Pick<
  FilterParams,
  | 'waterfront'
  | 'view'
  | 'fireplace'
  | 'basement'
  | 'garage'
  | 'new_construction'
  | 'pool'
  | 'air_conditioning'
>

export type MoreFiltersParams = Pick<
  FilterParams,
  | 'sqft_min'
  | 'sqft_max'
  | 'lot_size_min'
  | 'year_built_min'
  | 'year_built_max'
  | 'waterfront'
  | 'view'
  | 'fireplace'
  | 'basement'
  | 'garage'
  | 'new_construction'
  | 'pool'
  | 'air_conditioning'
  | 'sold_in_last'
>

export type MoreFiltersParamsPartial = Partial<MoreFiltersParams>

export type BedsBathsParam = Pick<FilterParams, 'beds_min' | 'baths_min'>

export type SortParams = Pick<FilterParams, 'sort_by' | 'sort_direction'>
