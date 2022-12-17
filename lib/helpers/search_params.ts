import type { AppState } from '../../store'
import { sortByDistanceValues } from '../constants/search_param_constants'

// the values of certain search params ("sort_by" for instance) may require us to include, exclude or change the values
// of other search params. this object provides a mapping between param names that may cause us to make these
// modifications and the functions that determine what, if any, those modifications should be. if the function
// determines that a modification is necessary, then it should return an object with the params that need to be changed.
// if params need to be removed we can do so by setting their values to null. if nothing needs to be changed then the
// function should not return a value.
export const modifyParam = {
  // TODO: add actual types for the params argument
  geotype(state:AppState, params: any) {
    if (!state.listingMap?.boundaryActive) {
      // excluding geotype from the service request causes it to not restrict the search to a geospatial boundary but
      // instead return all the listings that are within the the bounds provided in bounds_north, bounds_east, etc.
      return { geotype: null }
    }
  },

  // no boundary means we're doing a bounds search instead of a geospatial search, which doesn't require center_lat or
  // center_lon. including them probably doesn't hurt but removing them probably makes things more clear.
  center_lat(state:AppState, params: any) {
    if (!state.listingMap?.boundaryActive) {
      return { center_lat: null }
    }
  },
  
  center_lon(state:AppState, params: any) {
    if (!state.listingMap?.boundaryActive) {
      return { center_lon: null }
    }
  },

  sort_by(state:AppState, params: any) {
    // listing service uses user_lat & user_lon as basis for distance sort
    if (sortByDistanceValues.includes(params.sort_by)) {
      return { user_lat: params.center_lat, user_lon: params.center_lon }
    }
  },

  sold_days(state:AppState, params: any) {
    if (params.status === 'active') {
      return { sold_days: null }
    }
  }
}
 
export type ModifyParams = keyof typeof modifyParam
