import type { NextPage } from 'next'
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

const ListingMap: NextPage = () => {
  const { googleLoaded } = useGoogleMaps()
  const dispatch = useAppDispatch()
  const boundaryActive = useAppSelector(selectBoundaryActive)
  const geoLayerBounds = useAppSelector(selectGeoLayerBounds)
  const geoLayerCoordinates = useAppSelector(selectGeoLayerCoordinates)
  const listingSearchPending = useAppSelector(selectListingSearchPending)
  const listings = useAppSelector(selectListings)

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
            <ListingMarker listing={l} key={l.listingid} />
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
