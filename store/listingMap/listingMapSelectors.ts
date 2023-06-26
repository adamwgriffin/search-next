import type { AppState } from '..'
import type { BoundsParams } from '../../lib/types/listing_service_params_types'
import type { listingMapStateForListingSearchParams } from './listingMapTypes'
import { createSelector } from '@reduxjs/toolkit'
import pick from 'lodash/pick'
import omit from 'lodash/omit'
import omitBy from 'lodash/omitBy'
import isEqual from 'lodash/isEqual'
import { getGeoLayerBounds } from '../../lib/polygon'
import { initialState } from './listingMapSlice'

export const selectBoundaryActive = (state: AppState) =>
  state.listingMap.boundaryActive

export const selectBoundsParams = (state: AppState): BoundsParams => {
  return pick(
    state.listingMap,
    'bounds_north',
    'bounds_east',
    'bounds_south',
    'bounds_west'
  )
}

export const selectZoom = (state: AppState) => state.listingMap.zoom

export const selectGeoLayerCoordinates = (state: AppState) =>
  state.listingMap.geoLayerCoordinates

// this is a memoized selector functions created with the createSelector utility from Reselect. normal selectors will be
// re-run after every dispatched action, regardless of what section of the Redux root state was actually updated. where
// as this memoized selector will only run if it's input selector "selectGeoLayerCoordinates" returns a value that has
// changed.
//
// this is very important here, not just because getGeoLayerBounds() is potentially an expensive operation, but
// also because returning the same value on every action updates the bounds prop for GoogleMap, which causes GoogleMap
// to call fitBounds() on the same bounds, triggering an onIdle event, which in turn triggers selectGeoLayerBounds
// again, putting us in an endless loop.
export const selectGeoLayerBounds = createSelector(
  [selectGeoLayerCoordinates],
  (geoLayerCoordinates) => {
    return geoLayerCoordinates.length
      ? getGeoLayerBounds(geoLayerCoordinates)
      : null
  }
)
