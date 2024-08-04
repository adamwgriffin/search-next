import type { AppState } from '..'
import type { ListingMapStateForMap } from './listingMapTypes'
import { createSelector } from '@reduxjs/toolkit'
import pick from 'lodash/pick'

export const selectBoundaryActive = (state: AppState) =>
  state.listingMap.boundaryActive

export const selectZoom = (state: AppState) => state.listingMap.zoom

export const selectGeoLayerCoordinates = (state: AppState) =>
  state.listingMap.geoLayerCoordinates

export const selectMapState = createSelector(
  [selectBoundaryActive, selectZoom, selectGeoLayerCoordinates],
  (boundaryActive, zoom, geoLayerCoordinates): ListingMapStateForMap => ({
    boundaryActive,
    zoom,
    geoLayerCoordinates
  })
)

export const selectListingMap = (state: AppState) => state.listingMap

export const selectBounds = createSelector(
  [selectListingMap],
  (listingMap) => {
    return pick(listingMap, [
      'boundsNorth',
      'boundsEast',
      'boundsSouth',
      'boundsWest'
    ])
  }
)
