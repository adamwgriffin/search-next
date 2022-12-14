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

// params that we use to maintain state in the app that are also listing service params
export interface SearchParams {
  agent_uuid: string
  startidx: number
  pgsize: number
  pricemin: number | null
  pricemax: number | null
  bed_min: number | null
  bath_min: number | null
  sold_days: number | null
  openhouse: 2 | 3 | 4 | 5 | 6 | 7 | null
  openhouse_virtual: boolean | null
  openhouse_in_person: boolean | null
  ptype: number[]
  status: 'active' | 'sold'
  ex_pend: boolean | null
  ex_cs: boolean | null
  sqft_min: number | null
  sqft_max: number | null
  ls_conversion: 'sqft' | 'acres'
  lotsize_min: number | null
  lotsize_max: number | null
  yearblt_min: number | null
  yearblt_max: number | null
  days_indb: number | null
  water: boolean | null
  view: boolean | null
  onestory: boolean | null
  has_garage: boolean | null
  new_const: boolean | null
  virtual_tour: boolean | null
  has_pool: boolean | null
  senior_community: boolean | null
  sort_by: SortById
}

export type SearchParamsPartial = Partial<SearchParams>

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

export const sortByDistanceValues = Object.freeze([
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
  sold_days: 180,
  openhouse: null,
  openhouse_virtual: null,
  openhouse_in_person: null,
  // a.k.a., "property type"
  ptype: [1, 2, 8, 9],
  status: 'active',
  ex_pend: true,
  ex_cs: true,
  sqft_min: null,
  sqft_max: null,
  ls_conversion: 'acres',
  lotsize_min: null,
  lotsize_max: null,
  yearblt_min: null,
  yearblt_max: null,
  // a.k.a, Time on MLS
  days_indb: null,
  water: null,
  view: null,
  onestory: null,
  has_garage: null,
  new_const: null,
  virtual_tour: null,
  has_pool: null,
  senior_community: null,
  sort_by: sortByEnum.listing_date_desc
})
