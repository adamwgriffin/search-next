import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState } from '..'
import { selectBaseUrl } from '../environment/environmentSlice'
import { geoLayerSearch } from './listingMapAPI'
import { convertGeojsonCoordinatesToPolygonPaths, getGeoLayerBounds } from '../../lib/helpers/polygon'

export type GeoLayerCoordinate = google.maps.LatLngBoundsLiteral[]

export interface ListingMapData {
  bounds: google.maps.LatLngBoundsLiteral
  center: google.maps.LatLngLiteral
  zoom: number | null
  mapTypeId: string
}

export interface ListingMapState {
  buffer_miles: number,
  boundaryActive: boolean
  mapData: ListingMapData
  geoLayerCoordinates: GeoLayerCoordinate[]
}

const initialState: ListingMapState = {
  buffer_miles: 0,
  boundaryActive: true,
  mapData: {
    bounds: {
      north: 47.745274294284506,
      east: -122.38844700157635,
      south: 47.610393280504454,
      west:  -122.47058697044842
    },
    center: {
      lat: 47.6792172,
      lng:  -122.3860312
    },
    zoom: null,
    mapTypeId: 'roadmap'
  },
  // an array with one or more arrays of LatLngLiterals, e.g., [[{ lat: 47.228309, lng: -122.510645 },],], used for
  // Polygon paths as well as viewport bounds
  geoLayerCoordinates: []
}

export const getGeoLayer = createAsyncThunk(
  'listingMap/getGeoLayer',
  async (params: object, { getState }) => {
    const { environment } = getState() as AppState
    const baseUrl = selectBaseUrl(environment)
    const res = await geoLayerSearch(baseUrl, params)
    if (res.data.status !== 'error') {
      return res.data
    } else {
      throw new Error('GeoLayer response had error in status')
    }
  }
)

export const listingMapSlice = createSlice({
  name: 'listingMap',

  initialState,

  reducers: {
    setMapData: (state, action: PayloadAction<ListingMapData>) => {
      state.mapData = { ...state.mapData, ...action.payload }
    },

    setBoundaryActive: (state, action: PayloadAction<boolean>) => {
      state.boundaryActive = action.payload
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getGeoLayer.fulfilled, (state, action) => {
        state.geoLayerCoordinates = convertGeojsonCoordinatesToPolygonPaths(action.payload)
      })
  }

})

export const { setMapData, setBoundaryActive } = listingMapSlice.actions

export default listingMapSlice.reducer
