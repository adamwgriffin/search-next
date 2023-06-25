import type { GoogleMapState } from '../../components/map/GoogleMap/GoogleMap'

export type GeoJSONCoordinates = Array<Array<Array<Array<number>>>>
export type GeoLayerCoordinates = Array<Array<google.maps.LatLngLiteral>>

export interface ListingMapState {
  boundaryActive: boolean
  mapData: GoogleMapState
  geoLayerCoordinates: GeoLayerCoordinates
}
