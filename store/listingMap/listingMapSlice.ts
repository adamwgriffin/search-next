import {
  createAsyncThunk,
  createSlice,
  createSelector,
  PayloadAction
} from '@reduxjs/toolkit'
import type { AppState } from '..'
import { selectBaseUrl } from '../environment/environmentSlice'
import { selectGeoType } from '../places/placesSlice'
import { geoLayerSearch } from './listingMapAPI'
import {
  convertGeojsonCoordinatesToPolygonPaths,
  getGeoLayerBounds
} from '../../lib/helpers/polygon'
import { GoogleMapState } from '../../components/map/GoogleMap/GoogleMap'

export type GeoLayerCoordinates = Array<Array<google.maps.LatLngLiteral>>
export type GeoJSONCoordinates = Array<Array<Array<number>>>

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

export const getGeoLayer = createAsyncThunk(
  'listingMap/getGeoLayer',
  async (_args, { getState }):Promise<GeoJSONCoordinates> => {
    const state  = getState() as AppState
    const baseUrl = selectBaseUrl(state.environment)
    const res = await geoLayerSearch(
      baseUrl,
      {
        center_lat: state.places.geocoderResult.location.lat,
        center_lon: state.places.geocoderResult.location.lng,
        geotype: selectGeoType(state),
        buffer_miles: state.listingMap.buffer_miles,
        source: 'agent website'
      }
    )
    if (res.data.status !== 'error') {
      // @ts-ignore
      return res.data.result_list[0].geojson.coordinates
    } else {
      throw new Error('GeoLayer response had error in status')
    }
  }
)

export const listingMapSlice = createSlice({
  name: 'listingMap',

  initialState,

  reducers: {
    setMapData: (state, action: PayloadAction<GoogleMapState>) => {
      state.mapData = { ...state.mapData, ...action.payload }
    },

    setBoundaryActive: (state, action: PayloadAction<boolean>) => {
      state.boundaryActive = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getGeoLayer.fulfilled, (state, action) => {
      state.geoLayerCoordinates = convertGeojsonCoordinatesToPolygonPaths(
        action.payload
      )
    })

    builder.addCase(getGeoLayer.rejected, (state, action) => {
      console.error('getGeoLayer.rejected', action.error)
    })
  }
})

export const { setMapData, setBoundaryActive } = listingMapSlice.actions

export const selectBoundaryActive = (state: AppState) =>
  state.listingMap.boundaryActive

export const selectBufferMiles = (state: AppState) =>
  state.listingMap.buffer_miles

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
    return geoLayerCoordinates.length ?
      getGeoLayerBounds(geoLayerCoordinates) :
      null
  }
)

export default listingMapSlice.reducer
