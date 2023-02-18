import type { SortById, SortByEnum } from './types/listing_service_params_types'
import type { AppState } from '../store'
import type {
  FilterParams,
  ListingServiceParams,
  OpenHouseScheduleIDEnumInterface
} from './types/listing_service_params_types'
import { SearchTypes } from '../store/listingSearch/listingSearchSlice'

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

export const DefaultFilterParams: FilterParams = Object.freeze({
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
  sort_by: sortByEnum.listing_date_desc,
  lotsize_min: null,
  yearblt_min: null,
  yearblt_max: null,
  openhouse: null,
  water: null,
  view: null,
  onestory: null,
  has_garage: null,
  new_const: null,
  virtual_tour: null,
  has_pool: null,
  senior_community: null,
  sold_days: 730
})

export const OpenHouseScheduleIDEnum: OpenHouseScheduleIDEnumInterface = {
  upcomingWeekend: 2,
  thisSaturday: 3,
  thisSunday: 4,
  todayThroughSunday: 5,
  today: 6,
  tomorrow: 7
}

// the values of certain search params ("sort_by" for instance) may require us to include, exclude or change the values
// of other search params. this object provides a mapping between param names that may cause us to make these
// modifications and the functions that determine what, if any, those modifications should be. if the function
// determines that a modification is necessary, then it should return an object with the params that need to be changed.
// if params need to be removed we can do so by setting their values to null. if nothing needs to be changed then the
// function should not return a value.
export const modifyParam = {
  sort_by(state: AppState, params: ListingServiceParams) {
    // listing service uses user_lat & user_lon as basis for distance sort
    const { lat, lng } = state.places.geocoderResult.location
    if (params.sort_by && sortByDistanceValues.includes(params.sort_by)) {
      return { user_lat: lat, user_lon: lng }
    }
  },

  sold_days(state: AppState, params: ListingServiceParams) {
    if (state.listingSearch.searchType !== SearchTypes.Sold) {
      return { sold_days: null }
    }
  }
}

export type ModifyParams = keyof typeof modifyParam
