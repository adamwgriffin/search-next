import type { PayloadAction } from '@reduxjs/toolkit'
import type { GoogleMapState } from '../../components/map/GoogleMap/GoogleMap'
import { createSlice } from '@reduxjs/toolkit'
import {
  convertGeojsonCoordinatesToPolygonPaths} from '../../lib/polygon'
import { searchNewLocation } from '../listingSearch/listingSearchSlice'
import { ListingMapState } from './listingMapTypes'

export const initialState: ListingMapState = {
  boundaryActive: true,
  bounds_north: 47.745274294284506,
  bounds_east: -122.38844700157635,
  bounds_south: 47.610393280504454,
  bounds_west: -122.47058697044842,
  zoom: 12,
  // an array with one or more arrays of LatLngLiterals, e.g., [[{ lat: 47.228309, lng: -122.510645 },],], used for
  // Polygon paths
  geoLayerCoordinates: []
}

export const listingMapSlice = createSlice({
  name: 'listingMap',

  initialState,

  reducers: {
    setMapData: (state, action: PayloadAction<Partial<GoogleMapState>>) => {
      const { bounds, zoom } = action.payload
      if (bounds) {
        const { north, east, south, west } = bounds
        state.bounds_north = north
        state.bounds_east = east
        state.bounds_south = south
        state.bounds_west = west
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
        state.boundaryActive = true
      } else {
        console.debug(
          'In searchNewLocation.fulfilled, nothing in payload.result_geo.'
        )
      }
    })
  }
})

export const { setMapData, setBoundaryActive } = listingMapSlice.actions

export default listingMapSlice.reducer
