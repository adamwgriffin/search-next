import type { NextPage } from 'next'
import type { Listing } from '../../../lib/types/listing_types'
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
  setDoListingSearchOnMapIdle,
  setPopupListing,
  doGeospatialSearch,
  searchWithUpdatedFilters,
  resetStartIndex,
  selectDoListingSearchOnMapIdle,
  selectListings
} from '../../../store/listingSearch/listingSearchSlice'
import ListingMarkerPopup from '../../../containers/ListingMarkerPopup/ListingMarkerPopup'

const ListingMap: NextPage = () => {
  const { googleLoaded } = useGoogleMaps()  
  const dispatch = useAppDispatch()
  const boundaryActive = useAppSelector(selectBoundaryActive)
  const geoLayerBounds = useAppSelector(selectGeoLayerBounds)
  const geoLayerCoordinates = useAppSelector(selectGeoLayerCoordinates)
  const doListingSearchOnMapIdle = useAppSelector(selectDoListingSearchOnMapIdle)
  const listings = useAppSelector(selectListings)

  const handleListingMarkerMouseEnter = (listing:Listing) => {
    dispatch(setPopupListing(listing))
  }

  const handleListingMarkerMouseLeave = () => {
    dispatch(setPopupListing(null))
  }

  const handleBoundaryControlClick = () => {
    dispatch(setBoundaryActive(false))
    dispatch(searchWithUpdatedFilters())
  }

  const handleUserAdjustedMap = async (currentMapState: GoogleMapState) => {
    await dispatch(setMapData(currentMapState))
    dispatch(resetStartIndex())
    dispatch(setDoListingSearchOnMapIdle(true))
  }

  const handleIdle = (currentMapState: GoogleMapState) => {
    dispatch(setMapData(currentMapState))
    if (doListingSearchOnMapIdle) {
      dispatch(setDoListingSearchOnMapIdle(false))
      dispatch(doGeospatialSearch())
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
              key={l.listingid.toString()}
              listing={l}
              onMouseEnter={handleListingMarkerMouseEnter}
              onMouseLeave={handleListingMarkerMouseLeave}
            />
          ))}
          <ListingMarkerPopup />
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
