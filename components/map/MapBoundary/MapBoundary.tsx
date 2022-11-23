import type { NextPage } from 'next'
import type { GeoLayerCoordinates } from '../../../store//listingMap/listingMapSlice'
import { useEffect } from 'react'
import { useGoogleMaps } from '../../../context/google_maps_context'

export interface MapBoundaryProps {
  coordinates: GeoLayerCoordinates
  visible: boolean
  options: google.maps.PolygonOptions
}

let polygon:google.maps.Polygon

const MapBoundary: NextPage<MapBoundaryProps> = ({ coordinates=[], visible=true, options={} }) => {
  const { googleMap } = useGoogleMaps()
  polygon ||= new google.maps.Polygon()

  useEffect(() => {
    // if paths is empty then the polygon will not show on the map, so we can easily create it without showing it and
    // adds the paths later to make it visible
    polygon.setMap(googleMap)
    polygon.setPaths(coordinates)
    polygon.setOptions({ ...options, visible }) 
    return () => polygon.setMap(null)
  }, [])

  useEffect(() => {
    polygon.setMap(googleMap)
  }, [googleMap])
  
  useEffect(() => {
    polygon.setOptions({ ...options, visible }) 
  }, [options, visible])

  useEffect(() => {
    polygon.setPaths(coordinates)
  }, [coordinates])

  return null
}

export default MapBoundary
