import type { NextPage } from 'next'
import { useEffect } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { useGoogleMaps } from '../../../context/google_maps_context'
import ListingMarkerIcon from '../ListingMarkerIcon/ListingMarkerIcon'
import { ListingMarkerIconProps } from '../ListingMarkerIcon/ListingMarkerIcon'

export interface ListingMarkerProps {
  position: google.maps.LatLngLiteral
  color?: string
  colorHover?: string
  clickEventZoomLevel?: number
}

const ListingMarker: NextPage<ListingMarkerProps> = ({
  position,
  color = 'MediumPurple',
  colorHover = 'RebeccaPurple',
  clickEventZoomLevel = 16
}) => {
  const { googleMap } = useGoogleMaps()

  const createListingMarkerIcon = (options: ListingMarkerIconProps) => {
    const svgString = renderToStaticMarkup(<ListingMarkerIcon {...options} />)
    return {
      url: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`,
    }
  }

  useEffect(() => {
    if (!googleMap) return
    const markerIcon = createListingMarkerIcon({ fill: color })
    const markerIconHover = createListingMarkerIcon({ fill: colorHover })
    const marker = new google.maps.Marker({
      position: position,
      map: googleMap,
      icon: markerIcon
    })
    marker.addListener('click', () => {
      googleMap.setZoom(clickEventZoomLevel)
      googleMap.setCenter(marker.getPosition() as google.maps.LatLng)
    })
    marker.addListener('mouseover', () => marker.setIcon(markerIconHover))
    marker.addListener('mouseout', () => marker.setIcon(markerIcon))
    return () => marker.setMap(null)
  })

  return null
}

export default ListingMarker
