import type { NextPage } from 'next'
import type { Listing } from '../../../lib/types'
import { useEffect, useState  } from 'react'
import { createRoot } from 'react-dom/client'
import { useGoogleMaps } from '../../../context/google_maps_context'
import { DefaultMapOptions } from '../../../config/googleMapsOptions'
import { MapBoundaryOptions } from '../../../config'
import styles from './ListingMap.module.css'
import GoogleMap, { GoogleMapState } from '../GoogleMap/GoogleMap'
import ListingMarker from '../ListingMarker/ListingMarker'
import MapBoundary from '../MapBoundary/MapBoundary'
import BoundaryControl from '../BoundaryControl/BoundaryControl'
import { useAppSelector, useAppDispatch } from '../../../hooks'
import {
  setBoundaryActive,
  setMapData,
  selectBoundaryActive,
  selectGeoLayerBounds,
  selectGeoLayerCoordinates
} from '../../../store/listingMap/listingMapSlice'
import {
  setListingSearchPending,
  searchListings,
  searchWithUpdatedFilters,
  resetStartIndex,
  resetListings,
  selectListingSearchPending,
  selectListings
} from '../../../store/listingSearch/listingSearchSlice'
import ListingMarkerPopup from '../../map/ListingMarkerPopup/ListingMarkerPopup'
import MyPopup from '../../../lib/popup_new'
import { listingLocationToLatLngLiteral } from '../../../lib/helpers/listing_helpers'

const ListingMap: NextPage = () => {
  let Popup:any
  let popup:any
  const { googleMap, googleLoaded } = useGoogleMaps()
  const dispatch = useAppDispatch()
  const boundaryActive = useAppSelector(selectBoundaryActive)
  const geoLayerBounds = useAppSelector(selectGeoLayerBounds)
  const geoLayerCoordinates = useAppSelector(selectGeoLayerCoordinates)
  const listingSearchPending = useAppSelector(selectListingSearchPending)
  const listings = useAppSelector(selectListings)

  const handleListingMarkerMouseover = (listing:Listing) => {
    const containerDiv = document.createElement('div')
    const position = listingLocationToLatLngLiteral(listing.location)
    createRoot(containerDiv).render(<ListingMarkerPopup listing={listing} />)
    Popup ||= MyPopup()
    popup = new Popup(
      new google.maps.LatLng(position),
      containerDiv
    )
    popup.setMap(googleMap)
  }

  const handleListingMarkerMouseout = () => {
    popup?.setMap(null)
  }

  const handleBoundaryControlClick = () => {
    dispatch(setBoundaryActive(false))
    dispatch(resetStartIndex())
    dispatch(searchWithUpdatedFilters())
  }

  const handleUserAdjustedMap = async (currentMapState: GoogleMapState) => {
    await dispatch(setMapData(currentMapState))
    dispatch(resetStartIndex())
    dispatch(resetListings())
    dispatch(setListingSearchPending(true))
  }

  const handleIdle = (currentMapState: GoogleMapState) => {
    dispatch(setMapData(currentMapState))
    if (listingSearchPending) {
      dispatch(setListingSearchPending(false))
      dispatch(searchListings())
    }
  }

  if (googleLoaded) {
    return (
      <div className={styles.listingMap}>
        <GoogleMap
          options={DefaultMapOptions}
          bounds={geoLayerBounds}
          onIdle={handleIdle}
          onDragEnd={handleUserAdjustedMap}
          onUserChangedZoom={handleUserAdjustedMap}
        >
          {listings.map((l) => (
            <ListingMarker
              key={l.listingid}
              listing={l}
              onMouseover={handleListingMarkerMouseover}
              onMouseout={handleListingMarkerMouseout}
            />
          ))}
          <MapBoundary
            coordinates={geoLayerCoordinates}
            visible={boundaryActive}
            options={MapBoundaryOptions}
          />
        </GoogleMap>
        {boundaryActive && (
          <BoundaryControl onClick={handleBoundaryControlClick} />
        )}
      </div>
    )
  }
  return <div className={styles.listingMap}></div>
}

export default ListingMap
