import type { AppState } from '../../store'
import type { ListingServiceParams } from '../constants/search_param_constants'
import { sortByDistanceValues } from '../constants/search_param_constants'

// the values of certain search params ("sort_by" for instance) may require us to include, exclude or change the values
// of other search params. this object provides a mapping between param names that may cause us to make these
// modifications and the functions that determine what, if any, those modifications should be. if the function
// determines that a modification is necessary, then it should return an object with the params that need to be changed.
// if params need to be removed we can do so by setting their values to null. if nothing needs to be changed then the
// function should not return a value.
export const modifyParam = {
  sort_by(state:AppState, params: ListingServiceParams) {
    // listing service uses user_lat & user_lon as basis for distance sort
    const { lat, lng } = state.places.geocoderResult.location
    if (params.sort_by && sortByDistanceValues.includes(params.sort_by)) {
      return { user_lat: lat, user_lon: lng }
    }
  },

  sold_days(state:AppState, params: ListingServiceParams) {
    if (params.status === 'active') {
      return { sold_days: null }
    }
  }
}
 
export type ModifyParams = keyof typeof modifyParam
