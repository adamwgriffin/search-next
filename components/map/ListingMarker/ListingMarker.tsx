import type { NextPage } from 'next'
import type { Listing } from '../../../lib/types'
import { useEffect } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { useGoogleMaps } from '../../../context/google_maps_context'
import ListingMarkerIcon from '../ListingMarkerIcon/ListingMarkerIcon'
import { ListingMarkerIconProps } from '../ListingMarkerIcon/ListingMarkerIcon'
import { listingLocationToLatLngLiteral } from '../../../lib/helpers/listing_helpers'

export interface ListingMarkerProps {
  listing: Listing
  color?: string
  colorHover?: string
  clickEventZoomLevel?: number
  onMouseover?: (listing:Listing) => void
  onMouseout?: () => void
}

const ListingMarker: NextPage<ListingMarkerProps> = ({
  listing,
  color = 'MediumPurple',
  colorHover = 'RebeccaPurple',
  clickEventZoomLevel = 16,
  onMouseover,
  onMouseout
}) => {
  const { googleMap } = useGoogleMaps()

  // TODO: seems like maybe we should create the marker & icons only once, outside the Marker component then pass it in
  // somehow instead of create one for every ListingMarker component
  const createListingMarkerIcon = (options: ListingMarkerIconProps) => {
    const svgString = renderToStaticMarkup(<ListingMarkerIcon {...options} />)
    return {
      url: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`,
    }
  }

  const markerIcon = createListingMarkerIcon({ fill: color })
  const markerIconHover = createListingMarkerIcon({ fill: colorHover })

  const handleMouseover = (marker: google.maps.Marker) => {
    marker.setIcon(markerIconHover)
    onMouseover?.(listing)
  }
  
  const handleMouseout = (marker: google.maps.Marker) => {
    marker.setIcon(markerIcon)
    onMouseout?.()
  }

  useEffect(() => {
    if (!googleMap) return
    const position = listingLocationToLatLngLiteral(listing.location)
    const marker = new google.maps.Marker({
      position,
      map: googleMap,
      icon: markerIcon
    })
    // TODO: make click event open the listing detail page in a new tab instead
    marker.addListener('click', () => {
      window.open(`/listing/${listing.listingid}`, '_blank')
    })
    marker.addListener('mouseover', () => handleMouseover(marker))
    marker.addListener('mouseout', () => handleMouseout(marker))
    return () => {
      marker.setMap(null)
    }
  })

  return null
}

export default ListingMarker
