export type SortById =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18

export type ListingServiceGeotype =
  | 'AdminDivision1'
  | 'AdminDivision2'
  | 'AdminDivision3'
  | 'Postcode1'
  | 'Neighborhood'
  | 'PopulatedPlace'
  | 'Address'
  | 'NaturalFeature'

// listing service params that are used as filters. also used to maintain filter state in the app
export interface SearchParams {
  startidx: number
  pgsize: number
  pricemin: number | null
  pricemax: number | null
  bed_min: number | null
  bath_min: number | null
  status: 'active' | 'sold'
  ex_pend: boolean | null
  ex_cs: boolean | null
  sqft_min: number | null
  sqft_max: number | null
  sort_by: SortById
}

export type SearchParamsPartial = Partial<SearchParams>

// listing service params used to do a normal geospatial search
export interface ListingServiceParams extends SearchParamsPartial {
  company_uuid?: string
  center_lat?: number
  center_lon?: number
  bounds_north?: number
  bounds_east?: number
  bounds_south?: number
  bounds_west?: number
  geotype?: ListingServiceGeotype
  street?: string
  ptype?: string | null
}

export type CenterLatLonParams = Pick<ListingServiceParams, 'center_lat' | 'center_lon'>

export type BoundsParams = Pick<
  ListingServiceParams,
  'bounds_north' | 'bounds_east' | 'bounds_west' | 'bounds_south'
>

export type PriceRangeParams = Pick<SearchParams, 'pricemin' | 'pricemax'>

export type SquareFeetRangeParams = Pick<SearchParams, 'sqft_min' | 'sqft_max'>

export type ExcludeStatusParams = Pick<SearchParams, 'ex_pend' | 'ex_cs'>

export type MoreFiltersParams = Pick<
  SearchParams,
  'ex_pend' | 'ex_cs' | 'sqft_min' | 'sqft_max'
>

export type MoreFiltersParamsPartial = Partial<MoreFiltersParams>

export type BedsBathsParam = Pick<SearchParams, 'bed_min' | 'bath_min'>

export interface SortByEnum {
  baths_desc: SortById
  baths_asc: SortById
  beds_desc: SortById
  beds_asc: SortById
  distance_from_user_lat_lon_asc: SortById
  distance_from_user_lat_lon_desc: SortById
  listing_date_asc: SortById
  listing_date_desc: SortById
  price_desc: SortById
  price_asc: SortById
  status_category_asc: SortById
  status_category_desc: SortById
  total_square_footage_desc: SortById
  total_square_footage_asc: SortById
  total_lot_square_footage_desc: SortById
  total_lot_square_footage_asc: SortById
  sold_date_desc: SortById
  sold_date_asc: SortById
}
