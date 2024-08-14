import type { PayloadAction } from '@reduxjs/toolkit'
import type { GoogleMapState } from '../../components/map/GoogleMap/GoogleMap'
import { createSlice } from '@reduxjs/toolkit'
import {
  convertGeojsonCoordinatesToPolygonPaths,
  convertViewportToLatLngBoundsLiteral
} from '../../lib/polygon'
import { searchNewLocation } from '../listingSearch/listingSearchSlice'
import { ListingMapState } from './listingMapTypes'

export const initialState: ListingMapState = {
  boundaryActive: true,
  boundsNorth: 47.745274294284506,
  boundsEast: -122.38844700157635,
  boundsSouth: 47.610393280504454,
  boundsWest: -122.47058697044842,
  zoom: 12,
  // an array with one or more arrays of LatLngLiterals, e.g., [[{ lat: 47.228309, lng: -122.510645 },],], used for
  // Polygon paths
  geoLayerCoordinates: [],
  viewportBounds: null
}

export const listingMapSlice = createSlice({
  name: 'listingMap',

  initialState,

  reducers: {
    setMapData: (state, action: PayloadAction<Partial<GoogleMapState>>) => {
      const { bounds, zoom } = action.payload
      if (bounds) {
        const { north, east, south, west } = bounds
        state.boundsNorth = north
        state.boundsEast = east
        state.boundsSouth = south
        state.boundsWest = west
      }
      if (zoom) {
        state.zoom = zoom
      }
    },

    setBoundaryActive: (state, action: PayloadAction<boolean>) => {
      state.boundaryActive = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(searchNewLocation.fulfilled, (state, action) => {
      if (action.payload.boundary) {
        state.geoLayerCoordinates = convertGeojsonCoordinatesToPolygonPaths(
          action.payload.boundary.geometry.coordinates
        )
        state.viewportBounds = initialState.viewportBounds
        state.boundaryActive = true
      } else {
        state.geoLayerCoordinates = initialState.geoLayerCoordinates
        state.viewportBounds = convertViewportToLatLngBoundsLiteral(
          action.payload.geocoderResult[0].geometry.viewport
        )
        state.boundaryActive = false
      }
    })
  }
})

export const { setMapData, setBoundaryActive } = listingMapSlice.actions

export default listingMapSlice.reducer
