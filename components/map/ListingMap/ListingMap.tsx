import type { NextPage } from 'next'
import { useGoogleMaps } from '../../../context/google_maps_context'
import { DefaultMapOptions } from '../../../config/googleMapsOptions'
import { MapBoundaryOptions } from '../../../config'
import { placeHolderLocations, placeholderBoundary } from '../../../config/placeholders'
import styles from './ListingMap.module.css'
import GoogleMap from '../GoogleMap/GoogleMap'
import ListingMarker from '../ListingMarker/ListingMarker'
import MapBoundary from '../MapBoundary/MapBoundary'
import BoundaryControl from '../BoundaryControl/BoundaryControl'
import { useAppSelector, useAppDispatch } from '../../../hooks'
import { setBoundaryActive, selectBoundaryActive } from '../../../store/listingMap/listingMapSlice'

const ListingMap: NextPage = () => {
  const { googleLoaded } = useGoogleMaps()
  const dispatch = useAppDispatch()
  const boundaryActive = useAppSelector(selectBoundaryActive)

  const handleBoundaryControlClick = () => {
    dispatch(setBoundaryActive(!boundaryActive))
  }

  if (googleLoaded) {
    return (
      <div className={styles.listingMap}>
        <GoogleMap options={DefaultMapOptions}>
          {placeHolderLocations.map(l => <ListingMarker position={l} key={l.lat} /> )}
          <MapBoundary
            coordinates={placeholderBoundary}
            visible={boundaryActive}
            options={MapBoundaryOptions}
          />
        </GoogleMap>
        {boundaryActive && <BoundaryControl onClick={handleBoundaryControlClick} />}
      </div>
    )
  }
  return (<div className={styles.listingMap}></div>)
}

export default ListingMap