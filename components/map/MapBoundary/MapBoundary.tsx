import type { NextPage } from 'next'
import { useEffect } from 'react'
import { googleMap } from '../../../lib/google'

export interface MapBoundaryProps {
  coordinates: Array<Array<google.maps.LatLngLiteral>>
  options: google.maps.PolygonOptions
}

const MapBoundary: NextPage<MapBoundaryProps> = ({ coordinates=[], options={} }) => {
  // if paths is empty then the polygon will not show on the map, so we can easily create it without showing it and adds
  // the paths later to make it visible
  const polygon = new google.maps.Polygon({ paths: coordinates, ...options })

  useEffect(() => {
    polygon.setMap(googleMap)
    polygon.setPaths(coordinates)
    polygon.setOptions(options) 
    return () => polygon.setMap(null)
  })

  return null
}

export default MapBoundary
