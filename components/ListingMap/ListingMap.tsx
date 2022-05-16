import type { NextPage } from 'next'
import { mapOptions } from '../../config/google'
import GoogleMap from '../GoogleMap/GoogleMap'
import styles from './ListingMap.module.css'

const ListingMap: NextPage = () => {
  return (
    <div className={styles.listingMap}>
      <GoogleMap options={mapOptions} />
    </div>
  )
}

export default ListingMap
