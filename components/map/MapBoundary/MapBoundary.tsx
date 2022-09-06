import type { NextPage } from 'next'
import { useEffect } from 'react'
import { useGoogleMaps } from '../../../context/google_maps_context'

export interface MapBoundaryProps {
  coordinates: Array<Array<google.maps.LatLngLiteral>>
  visible: boolean
  options: google.maps.PolygonOptions
}

const MapBoundary: NextPage<MapBoundaryProps> = ({ coordinates=[], visible=true, options={} }) => {
  const { googleMap } = useGoogleMaps()
  // if paths is empty then the polygon will not show on the map, so we can easily create it without showing it and adds
  // the paths later to make it visible
  const polygon = new google.maps.Polygon({ paths: coordinates, ...options, visible })

  useEffect(() => {
    polygon.setMap(googleMap)
    polygon.setPaths(coordinates)
    polygon.setOptions({ ...options, visible }) 
    return () => polygon.setMap(null)
  })

  return null
}

export default MapBoundary
