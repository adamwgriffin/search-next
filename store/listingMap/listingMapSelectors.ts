import type { AppState } from '..'
import type { ListingMapStateForMap } from './listingMapTypes'
import { createSelector } from '@reduxjs/toolkit'

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
