export type SortType = 'listedDate' | 'listPrice' | 'beds' | 'baths' | 'sqft'

export type SortDirection = 'asc' | 'desc'

export type ListingServiceGeotype =
  | 'AdminDivision1'
  | 'AdminDivision2'
  | 'AdminDivision3'
  | 'Postcode1'
  | 'Neighborhood'
  | 'PopulatedPlace'
  | 'Address'
  | 'NaturalFeature'

export type PropertyStatus = 'active' | 'pending' | 'sold'

export type OpenHouseScheduleID = 2 | 3 | 4 | 5 | 6 | 7 | null

export interface OpenHouseScheduleIDEnumInterface {
  upcomingWeekend: OpenHouseScheduleID
  thisSaturday: OpenHouseScheduleID
  thisSunday: OpenHouseScheduleID
  todayThroughSunday: OpenHouseScheduleID
  today: OpenHouseScheduleID
  tomorrow: OpenHouseScheduleID
}

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
  openhouse: OpenHouseScheduleID
  sold_days: number | null
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
  geotype?: ListingServiceGeotype
  address?: string
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

export type OpenHouseParam = Pick<FilterParams, 'openhouse'>

export type SoldDaysParam = Pick<FilterParams, 'sold_days'>

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
  | 'openhouse'
  | 'waterfront'
  | 'view'
  | 'fireplace'
  | 'basement'
  | 'garage'
  | 'new_construction'
  | 'pool'
  | 'air_conditioning'
  | 'sold_days'
>

export type MoreFiltersParamsPartial = Partial<MoreFiltersParams>

export type BedsBathsParam = Pick<FilterParams, 'beds_min' | 'baths_min'>

export type SortParams = Pick<FilterParams, 'sort_by' | 'sort_direction'>
