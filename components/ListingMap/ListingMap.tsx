import type { NextPage } from 'next'
import { mapOptions } from '../../config/google'
import GoogleMap from '../GoogleMap/GoogleMap'
import styles from './ListingMap.module.css'
import ListingMarker from '../ListingMarker/ListingMarker'

const ListingMap: NextPage = () => {
  const locations = [
    { lat: 37.76391538002967, lng: -122.41813354868268 },
    { lat: 37.78144661558212, lng:  -122.43691335449215 },
    { lat: 37.79985994480058, lng:  -122.40899396931235 }
  ]
  return (
    <div className={styles.listingMap}>
      <GoogleMap options={mapOptions}>
        {locations.map(l => <ListingMarker position={l} key={l.lat} /> )}
      </GoogleMap>
    </div>
  )
}

export default ListingMap
