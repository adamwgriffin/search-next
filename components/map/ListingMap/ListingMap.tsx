import type { NextPage } from 'next'
import { useMedia } from 'react-use'
import { useGoogleMaps } from '../../../context/google_maps_context'
import { DefaultMapOptions } from '../../../config/googleMapsOptions'
import { MapBoundaryOptions } from '../../../config/googleMapsOptions'
import styles from './ListingMap.module.css'
import GoogleMap, { GoogleMapState } from '../GoogleMap/GoogleMap'
import ListingMarker from '../ListingMarker/ListingMarker'
import MapBoundary from '../MapBoundary/MapBoundary'
import MapControl from '../MapControl/MapControl'
import ZoomControl from '../ZoomControl/ZoomControl'
import { useAppSelector, useAppDispatch } from '../../../hooks'
import {
  setBoundaryActive,
  setMapData} from '../../../store/listingMap/listingMapSlice'
import {
  selectBoundaryActive,
  selectGeoLayerBounds,
  selectZoom,
  selectGeoLayerCoordinates
} from '../../../store/listingMap/listingMapSelectors'
import {
  setDoListingSearchOnMapIdle,
  setSelectedListing,
  searchCurrentLocation,
  searchWithUpdatedFilters
} from '../../../store/listingSearch/listingSearchSlice'
import {
  selectDoListingSearchOnMapIdle,
  selectListings,
  selectListingSearchRunning,
  selectHighlightedMarker
} from '../../../store/listingSearch/listingSearchSelectors'
import { resetStartIndex } from '../../../store/filters/filtersSlice'
import { openModal } from '../../../store/application/applicationSlice'
import { addUrlToBrowserHistory } from '../../../lib/url'

const ListingMap: NextPage = () => {
  const dispatch = useAppDispatch()
  const { googleLoaded } = useGoogleMaps()
  const isSmallAndUp = useMedia('(min-width: 576px)', false)
  const boundaryActive = useAppSelector(selectBoundaryActive)
  const geoLayerBounds = useAppSelector(selectGeoLayerBounds)
  const zoom = useAppSelector(selectZoom)
  const geoLayerCoordinates = useAppSelector(selectGeoLayerCoordinates)
  const doListingSearchOnMapIdle = useAppSelector(
    selectDoListingSearchOnMapIdle
  )
  const listings = useAppSelector(selectListings)
  const listingSearchRunning = useAppSelector(selectListingSearchRunning)
  const highlightedMarker = useAppSelector(selectHighlightedMarker)

  const handleListingMarkerMouseEnter = (listingid: string) => {
    isSmallAndUp && dispatch(setSelectedListing(listingid))
  }

  const handleListingMarkerMouseLeave = () => {
    isSmallAndUp && dispatch(setSelectedListing(null))
  }

  const handleListingMarkerMouseClick = (listingId: string) => {
    const url = `/listing/${listingId}`
    if (isSmallAndUp) {
      window.open(url, '_blank')
    } else {
      dispatch(
        openModal({
          modalType: 'listingDetail',
          modalProps: { listingId }
        })
      )
      addUrlToBrowserHistory(url)
    }
  }

  const handleBoundaryControlClick = () => {
    dispatch(setBoundaryActive(false))
    dispatch(searchWithUpdatedFilters())
  }

  const handleUserAdjustedMap = async (
    currentMapState: Partial<GoogleMapState>
  ) => {
    await dispatch(setMapData(currentMapState))
    dispatch(resetStartIndex())
    dispatch(setDoListingSearchOnMapIdle(true))
  }

  const handleZoomIn = () => {
    handleUserAdjustedMap({ zoom: zoom + 1 })
  }

  const handleZoomOut = () => {
    handleUserAdjustedMap({ zoom: zoom - 1 })
  }

  const handleIdle = (currentMapState: GoogleMapState) => {
    dispatch(setMapData(currentMapState))
    if (doListingSearchOnMapIdle) {
      dispatch(setDoListingSearchOnMapIdle(false))
      dispatch(searchCurrentLocation())
    }
  }

  if (googleLoaded) {
    return (
      <div className={styles.listingMap}>
        <GoogleMap
          options={DefaultMapOptions}
          bounds={geoLayerBounds}
          zoom={zoom}
          onIdle={handleIdle}
          onDragEnd={handleUserAdjustedMap}
          onZoomChanged={handleUserAdjustedMap}
        >
          {listings.map((l, i) => (
            <ListingMarker
              key={l._id.toString()}
              listing={l}
              onMouseEnter={handleListingMarkerMouseEnter}
              onMouseLeave={handleListingMarkerMouseLeave}
              onClick={handleListingMarkerMouseClick}
              highlighted={highlightedMarker === l._id}
              zIndex={i}
            />
          ))}
          <MapBoundary
            coordinates={geoLayerCoordinates}
            visible={boundaryActive}
            options={MapBoundaryOptions}
          />
        </GoogleMap>
        <MapControl
          boundaryActive={boundaryActive}
          listingSearchRunning={listingSearchRunning}
          onBoundaryControlClick={handleBoundaryControlClick}
        />
        <ZoomControl onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
      </div>
    )
  }
  return <div className={styles.listingMap}></div>
}

export default ListingMap
