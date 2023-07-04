import type { AppState } from '..'
import { createSelector } from '@reduxjs/toolkit'
import { getGeoLayerBounds } from '../../lib/polygon'

export const selectBoundaryActive = (state: AppState) =>
  state.listingMap.boundaryActive

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
    // getGeoLayerBounds depends on google being loaded to create a bounds object so don't try to call it if google
    // isn't loaded yet
    return typeof google !== 'undefined' && geoLayerCoordinates.length
      ? getGeoLayerBounds(geoLayerCoordinates)
      : null
  }
)
