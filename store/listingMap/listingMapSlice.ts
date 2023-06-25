import type { PayloadAction } from '@reduxjs/toolkit'
import type { GoogleMapState } from '../../components/map/GoogleMap/GoogleMap'
import { createSlice } from '@reduxjs/toolkit'
import {
  convertGeojsonCoordinatesToPolygonPaths} from '../../lib/polygon'
import { searchNewLocation } from '../listingSearch/listingSearchSlice'

export type GeoJSONCoordinates = Array<Array<Array<Array<number>>>>
export type GeoLayerCoordinates = Array<Array<google.maps.LatLngLiteral>>

export interface ListingMapState {
  boundaryActive: boolean
  mapData: GoogleMapState
  geoLayerCoordinates: GeoLayerCoordinates
}

const initialState: ListingMapState = {
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
