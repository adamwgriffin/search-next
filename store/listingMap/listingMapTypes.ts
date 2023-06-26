import type { BoundsParams } from '../../lib/types/listing_service_params_types'

export type MultiPolygon = Array<Array<Array<Array<number>>>>

export type GeoLayerCoordinates = Array<Array<google.maps.LatLngLiteral>>

export interface ListingMapState
  extends BoundsParams {
  boundaryActive: boolean
  zoom: number
  geoLayerCoordinates: GeoLayerCoordinates
}
