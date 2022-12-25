import type { NextPage } from 'next'
import type { Listing } from '../../../lib/types/listing_types'
import { useEffect, memo } from 'react'
import { createRoot } from 'react-dom/client'
import { useGoogleMaps } from '../../../context/google_maps_context'
import ListingMarkerContent from '../ListingMarkerContent/ListingMarkerContent'
import { listingLocationToLatLngLiteral } from '../../../lib/helpers/listing_helpers'

export interface ListingMarkerProps {
  listing: Listing
  onMouseEnter?: (listingid: number) => void
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
      onMouseEnter?.(listing.listingid)
    }

    const handleMouseLeave = () => {
      element.style.zIndex = ''
      onMouseLeave?.()
    }

    const link = `/listing/${listing.listingid}`

    const markerContainer = document.createElement('div')
    createRoot(markerContainer).render(
      <ListingMarkerContent listing={listing} link={link} />
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

const areEqual = (
  prevProps: Readonly<ListingMarkerProps>,
  nextProps: Readonly<ListingMarkerProps>
) => {
  return (
    prevProps.listing.listingid === nextProps.listing.listingid &&
    prevProps.listing.location.latitude ===
      nextProps.listing.location.latitude &&
    prevProps.listing.location.longitude ===
      nextProps.listing.location.longitude
  )
}

// use the memo() HOC to avoid re-rendering markers on the map so it's more effecient and doesn't cause all the markers
// to flicker each time the map is dragged
export default memo(ListingMarker, areEqual)
