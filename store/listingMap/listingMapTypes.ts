export type MultiPolygon = Array<Array<Array<Array<number>>>>

export type GeoLayerCoordinates = Array<Array<google.maps.LatLngLiteral>>

export interface ListingMapState {
  boundaryActive: boolean
  boundsNorth: number
  boundsEast: number
  boundsSouth: number
  boundsWest: number
  zoom: number
  geoLayerCoordinates: GeoLayerCoordinates
}
