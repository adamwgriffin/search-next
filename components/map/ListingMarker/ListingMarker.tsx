import type { NextPage } from 'next'
import type { Listing } from '../../../lib/types'
import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { useGoogleMaps } from '../../../context/google_maps_context'
import ListingMarkerContent from '../ListingMarkerContent/ListingMarkerContent'
import {
  listingLocationToLatLngLiteral,
  formatPrice,
  ShortCurrencyFormat
} from '../../../lib/helpers/listing_helpers'

export interface ListingMarkerProps {
  listing: Listing
  onMouseEnter?: (listing: Listing) => void
  onMouseLeave?: () => void
}

const ListingMarker: NextPage<ListingMarkerProps> = ({
  listing,
  onMouseEnter,
  onMouseLeave
}) => {
  const { googleMap } = useGoogleMaps()

  useEffect(() => {
    if (!googleMap) return

    const handleMouseEnter = () => {
      element.style.zIndex = '1'
      onMouseEnter?.(listing)
    }
  
    const handleMouseLeave = () => {
      element.style.zIndex = ''
      onMouseLeave?.()
    }

    const link = `/listing/${listing.listingid}`

    const markerContainer = document.createElement('div')
    createRoot(markerContainer).render(
      <ListingMarkerContent
        price={formatPrice(listing, ShortCurrencyFormat)}
        link={link}
      />
    )

    const marker = new google.maps.marker.AdvancedMarkerView({
      map: googleMap,
      position: listingLocationToLatLngLiteral(listing.location),
      content: markerContainer
    })

    marker.addListener('click', () => window.open(link, '_blank'))
    // there are only a few events that AdvancedMarkerView supports, so we have to attach events to the element for
    // others.
    const element = marker.element as HTMLElement
    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      marker.map = null
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }

  }, [googleMap, listing, onMouseEnter, onMouseLeave])

  return null
}

export default ListingMarker
