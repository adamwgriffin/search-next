'use client'

import type { NextPage } from 'next'
import { useMemo } from 'react'
import { useMedia } from 'react-use'
import { useSession } from 'next-auth/react'
import { useGoogleMaps } from '../../../providers/GoogleMapsProvider'
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
  setMapData
} from '../../../store/listingMap/listingMapSlice'
import { selectMapState } from '../../../store/listingMap/listingMapSelectors'
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
import { getGeoLayerBounds } from '../../../lib/polygon'

const ListingMap: NextPage = () => {
  const { status } = useSession()
  const dispatch = useAppDispatch()
  const { googleLoaded } = useGoogleMaps()
  const isSmallAndUp = useMedia('(min-width: 576px)', false)
  const mapState = useAppSelector(selectMapState)
  const doListingSearchOnMapIdle = useAppSelector(
    selectDoListingSearchOnMapIdle
  )
  const listings = useAppSelector(selectListings)
  const listingSearchRunning = useAppSelector(selectListingSearchRunning)
  const highlightedMarker = useAppSelector(selectHighlightedMarker)

  // Memoizing bounds is important here because without it we can wind up in an endless loop. With each render, we pass
  // bounds to the <GoogleMap> bounds prop, which causes <GoogleMap> to call fitBounds(bounds). Calling fitBounds()
  // triggers an onIdle event from <GoogleMap>, which we handle by dispatching setMap. since setMap changes the
  // listingtMap store, it may cause <ListingMap> to re-render. without useMemo the bounds can be exactly the same but
  // will have a new reference ID, which will trigger the cycle again as if there were new bounds.
  //
  // We're checking googleLoaded because the getGeoLayerBounds function depends on google being loaded to be able to
  // create a bounds object. It's also important to track googleLoaded in the dependency array here because we want to
  // make sure that bounds updates once google is loaded if there are bounds available. If we don't do that the map
  // sometimes gets zoomed out too far because <GoogleMap> never gets the bounds, and therefore doesn't call fitBounds(),
  // which would adjust the zoom. This is also why we switched to useMemo instead of createSelector for this: the bug
  // showed up and there was no simple way to track googleLoaded like this with createSelector.
  const bounds = useMemo(() => {
    return googleLoaded && mapState.geoLayerCoordinates.length
      ? getGeoLayerBounds(mapState.geoLayerCoordinates)
      : null
  }, [googleLoaded, mapState.geoLayerCoordinates])

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
    dispatch(setMapData(currentMapState))
    dispatch(resetStartIndex())
    dispatch(setDoListingSearchOnMapIdle(true))
  }

  const handleZoomIn = () => {
    handleUserAdjustedMap({ zoom: mapState.zoom + 1 })
  }

  const handleZoomOut = () => {
    handleUserAdjustedMap({ zoom: mapState.zoom - 1 })
  }

  const handleIdle = (newMapState: GoogleMapState) => {
    dispatch(setMapData(newMapState))
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
          bounds={bounds}
          zoom={mapState.zoom}
          onIdle={handleIdle}
          onDragEnd={handleUserAdjustedMap}
          onZoomChanged={handleUserAdjustedMap}
        >
          {listings.map((l, i) => (
            <ListingMarker
              key={l._id.toString()}
              authenticaticated={status === 'authenticated'}
              listing={l}
              highlighted={highlightedMarker === l._id}
              zIndex={i}
              onMouseEnter={handleListingMarkerMouseEnter}
              onMouseLeave={handleListingMarkerMouseLeave}
              onClick={handleListingMarkerMouseClick}
            />
          ))}
          <MapBoundary
            coordinates={mapState.geoLayerCoordinates}
            visible={mapState.boundaryActive}
            options={MapBoundaryOptions}
          />
        </GoogleMap>
        <MapControl
          boundaryActive={mapState.boundaryActive}
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
