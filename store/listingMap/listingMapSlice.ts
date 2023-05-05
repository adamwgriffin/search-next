import type { PayloadAction } from '@reduxjs/toolkit'
import type { AppState } from '..'
import type { GoogleMapState } from '../../components/map/GoogleMap/GoogleMap'
import { createSlice, createSelector } from '@reduxjs/toolkit'
import {
  convertGeojsonCoordinatesToPolygonPaths,
  getGeoLayerBounds
} from '../../lib/polygon'
import { doGeospatialGeocodeSearch } from '../listingSearch/listingSearchSlice'

export type GeoJSONCoordinates = Array<Array<Array<Array<number>>>>
export type GeoLayerCoordinates = Array<Array<google.maps.LatLngLiteral>>

export interface ListingMapState {
  buffer_miles: number
  boundaryActive: boolean
  mapData: GoogleMapState
  geoLayerCoordinates: GeoLayerCoordinates
}

const initialState: ListingMapState = {
  buffer_miles: 0,
  boundaryActive: true,
  mapData: {
    bounds: {
      north: 47.745274294284506,
      east: -122.38844700157635,
      south: 47.610393280504454,
      west: -122.47058697044842
    },
    center: {
      lat: 47.6792172,
      lng: -122.3860312
    },
    zoom: 12
  },
  // an array with one or more arrays of LatLngLiterals, e.g., [[{ lat: 47.228309, lng: -122.510645 },],], used for
  // Polygon paths
  geoLayerCoordinates: []
}

export const listingMapSlice = createSlice({
  name: 'listingMap',

  initialState,

  reducers: {
    setMapData: (state, action: PayloadAction<Partial<GoogleMapState>>) => {
      state.mapData = { ...state.mapData, ...action.payload }
    },

    setBoundaryActive: (state, action: PayloadAction<boolean>) => {
      state.boundaryActive = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(doGeospatialGeocodeSearch.fulfilled, (state, action) => {
      if (action.payload.boundary) {
        state.geoLayerCoordinates = convertGeojsonCoordinatesToPolygonPaths(
          action.payload.boundary.geometry.coordinates
        )
        state.boundaryActive = true
      } else {
        console.debug(
          'In doGeospatialGeocodeSearch.fulfilled, nothing in payload.result_geo.'
        )
      }
    })
  }
})

export const { setMapData, setBoundaryActive } = listingMapSlice.actions

export const selectBoundaryActive = (state: AppState) =>
  state.listingMap.boundaryActive

export const selectZoom = (state: AppState) => state.listingMap.mapData.zoom

export const selectGeoLayerCoordinates = (state: AppState) =>
  state.listingMap.geoLayerCoordinates

// this is a memoized selector functions created with the createSelector utility from Reselect. normal selectors will be
// re-run after every dispatched action, regardless of what section of the Redux root state was actually updated. where
// as this memoized selector will only run if it's input selector "selectGeoLayerCoordinates" returns a value that has
// changed.

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

export default listingMapSlice.reducer
