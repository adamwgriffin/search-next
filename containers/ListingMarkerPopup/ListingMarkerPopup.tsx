import type { NextPage } from 'next'
import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { useGoogleMaps } from '../../context/google_maps_context'
import { useAppSelector } from '../../hooks'
import { selectPopupListing } from '../../store/listingSearch/listingSearchSlice'
import { listingLocationToLatLngLiteral } from '../../lib/helpers/listing_helpers'
import { lazyLoadPopup } from '../../lib/popup'
import ListingMarkerPopupCard from '../../components/map/ListingMarkerPopupCard/ListingMarkerPopupCard'

let Popup: any
let popupInstance: any

const ListingMarkerPopup: NextPage = () => {
  const { googleMap, googleLoaded } = useGoogleMaps()
  const listing = useAppSelector(selectPopupListing)
  
  // we have to wait until google is loaded to return the Popup class otherwise the google.maps.OverlayView it inherits
  // from will not exist yet.
  useEffect(() => {
    Popup ||= lazyLoadPopup()
  }, [googleLoaded])

  useEffect(() => {
    // triggers Popup.onRemove() method to remove the overlay from the map
    popupInstance?.setMap(null)
    if (googleMap && listing) {
      const containerDiv = document.createElement('div')
      const position = listingLocationToLatLngLiteral(listing.location)
      // createRoot + render allows us to programmatically render the ListingMarkerPopupCard component as a dom node
      // inside of the containerDiv
      createRoot(containerDiv).render(
        <ListingMarkerPopupCard listing={listing} />
      )
      popupInstance = new Popup(new google.maps.LatLng(position), containerDiv)
      // triggers Popup.onAdd() method to add the new overlay instance to the map
      popupInstance.setMap(googleMap)
    }
  }, [listing])

  return null
}

export default ListingMarkerPopup
