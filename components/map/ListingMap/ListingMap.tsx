import type { NextPage } from 'next'
import { mapOptions } from '../../../config/google'
import { MapBoundaryOptions } from '../../../config'
import { placeHolderLocations, placeholderBoundary } from '../../../config/placeholders'
import GoogleMap from '../GoogleMap/GoogleMap'
import styles from './ListingMap.module.css'
import ListingMarker from '../ListingMarker/ListingMarker'
import MapBoundary from '../MapBoundary/MapBoundary'
import BoundaryControl from '../BoundaryControl/BoundaryControl'

const ListingMap: NextPage = () => {
  
  return (
    <div className={styles.listingMap}>
      <GoogleMap options={mapOptions}>
        {placeHolderLocations.map(l => <ListingMarker position={l} key={l.lat} /> )}
        <MapBoundary coordinates={placeholderBoundary} options={MapBoundaryOptions} />
      </GoogleMap>
      <BoundaryControl />
    </div>
  )
}

export default ListingMap
