'use client'

import type { NextPage } from 'next'
import type { Listing } from '../../../lib/types/listing_types'
import { useEffect, useState, memo } from 'react'
import { createPortal } from 'react-dom'
import { useGoogleMaps } from '../../../providers/GoogleMapsProvider'
import ListingMarkerContent from '../ListingMarkerContent/ListingMarkerContent'
import { listingLocationToLatLngLiteral } from '../../../lib/listing_helpers'
import { objectsValuesEqual } from '../../../lib'

export interface ListingMarkerProps {
  listing: Listing
  highlighted?: boolean
  zIndex: number
  onMouseEnter?: (listingid: string) => void
  onMouseLeave?: () => void
  onClick?: (listingid: string) => void
}

const ListingMarker: NextPage<ListingMarkerProps> = ({
  listing,
  highlighted,
  zIndex,
  onMouseEnter,
  onMouseLeave,
  onClick
}) => {
  const { googleMap } = useGoogleMaps()
  const [markerContainer, setMarkerContainer] = useState<HTMLDivElement | null>(
    null
  )

  useEffect(() => {
    if (!googleMap) return

    const markerContainer = document.createElement('div')
    const marker = new google.maps.marker.AdvancedMarkerElement({
      map: googleMap,
      position: listingLocationToLatLngLiteral(listing),
      content: markerContainer
    })
    marker.addListener('click', () => onClick?.(listing._id))
    // there are currently only a few events that AdvancedMarkerElement supports, so we have to attach events to the
    // element itself for others to work. Note: the element this returns appears to not be the same as the
    // markerContainer div we created above since setting style attributes on it does not work, while it does with
    // marker.element.
    const markerElement = marker.element
    markerElement.style.zIndex = highlighted ? '10000' : zIndex.toString()
    const handleMouseEnter = () => {
      markerElement.style.zIndex = '10000'
      onMouseEnter?.(listing._id)
    }
    const handleMouseLeave = () => {
      markerElement.style.zIndex = zIndex.toString()
      onMouseLeave?.()
    }
    markerElement.addEventListener('mouseenter', handleMouseEnter)
    markerElement.addEventListener('mouseleave', handleMouseLeave)

    setMarkerContainer(markerContainer)

    // Clean up by removing event listeners, removing the marker from the map and removing the div element we created
    // from the DOM. Not sure if all of this is strictly necessary. We're doing it for now, just in case.
    return () => {
      markerElement.removeEventListener('mouseenter', handleMouseEnter)
      markerElement.removeEventListener('mouseleave', handleMouseLeave)
      marker.map = null
      markerContainer.remove()
    }
  }, [
    googleMap,
    highlighted,
    listing,
    onClick,
    onMouseEnter,
    onMouseLeave,
    zIndex
  ])

  if (markerContainer === null) return

  return createPortal(
    <ListingMarkerContent
      listing={listing}
      link={`/listing/${listing._id}`}
      highlighted={highlighted}
    />,
    markerContainer
  )
}

// Don't re-render the marker if all of these conditions are true
const areEqual = (
  prevProps: Readonly<ListingMarkerProps>,
  nextProps: Readonly<ListingMarkerProps>
) => {
  return objectsValuesEqual(prevProps, nextProps, [
    'listing._id',
    'listing.latitude',
    'listing.longitude',
    'highlighted'
  ])
}

// use the memo() HOC to avoid re-rendering markers on the map so it's more effecient and doesn't cause every marker
// to flicker each time the map is dragged
export default memo(ListingMarker, areEqual)
