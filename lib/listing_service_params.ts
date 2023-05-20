import type { AppState } from '../store'
import type {
  FilterParams,
  ListingServiceParams,
  OpenHouseScheduleIDEnumInterface
} from './types/listing_service_params_types'
import { SearchTypes } from '../store/listingSearch/listingSearchSlice'

export const DefaultFilterParams: FilterParams = Object.freeze({
  page_index: 0,
  page_size: 20,
  price_min: null,
  price_max: null,
  beds_min: 0,
  baths_min: 0,
  status: 'active',
  sqft_min: null,
  sqft_max: null,
  sort_by: 'listedDate',
  sort_direction: 'desc',
  lot_size_min: null,
  year_built_min: null,
  year_built_max: null,
  openhouse: null,
  water: null,
  view: null,
  onestory: null,
  has_garage: null,
  new_const: null,
  virtual_tour: null,
  has_pool: null,
  senior_community: null,
  sold_days: 730,
  property_type: null
})

export const OpenHouseScheduleIDEnum: OpenHouseScheduleIDEnumInterface = {
  upcomingWeekend: 2,
  thisSaturday: 3,
  thisSunday: 4,
  todayThroughSunday: 5,
  today: 6,
  tomorrow: 7
}

// the values of certain search params may require us to include, exclude or change the values of other search params.
// this object provides a mapping between param names that may cause us to make these modifications and the functions
// that determine what, if any, those modifications should be. if the function determines that a modification is
// necessary, then it should return an object with the params that need to be changed. if params need to be removed we
// can do so by setting their values to null. if nothing needs to be changed then the function should not return a
// value.
export const modifyParam = {
  sold_days(state: AppState, params: ListingServiceParams) {
    if (state.listingSearch.searchType !== SearchTypes.Sold) {
      return { sold_days: null }
    }
  }
}

export type ModifyParams = keyof typeof modifyParam
