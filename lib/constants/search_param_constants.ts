// TODO: not sure if search params should actually be considerted "constants". maybe relocating these to a different
// file would make more sense.

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
  agent_uuid: string
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

export const sortByEnum: SortByEnum = Object.freeze({
  baths_desc: 3,
  baths_asc: 4,
  beds_desc: 5,
  beds_asc: 6,
  distance_from_user_lat_lon_asc: 11,
  distance_from_user_lat_lon_desc: 12,
  listing_date_asc: 9,
  listing_date_desc: 10,
  price_desc: 1,
  price_asc: 2,
  status_category_asc: 7,
  status_category_desc: 8,
  total_square_footage_desc: 13,
  total_square_footage_asc: 14,
  total_lot_square_footage_desc: 15,
  total_lot_square_footage_asc: 16,
  sold_date_desc: 17,
  sold_date_asc: 18
})

export const sortByDistanceValues: Readonly<Array<SortById>> = Object.freeze([
  sortByEnum.distance_from_user_lat_lon_asc,
  sortByEnum.distance_from_user_lat_lon_desc
])

export const DefaultSearchParams = Object.freeze({
  agent_uuid: 'f74a3f6d-aeda-4daa-835e-029386152405',
  startidx: 0,
  pgsize: 20,
  pricemin: null,
  pricemax: null,
  bed_min: 0,
  bath_min: 0,
  status: 'active',
  ex_pend: true,
  ex_cs: true,
  sqft_min: null,
  sqft_max: null,
  sort_by: sortByEnum.listing_date_desc
})
