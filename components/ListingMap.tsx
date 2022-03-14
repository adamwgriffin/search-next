import type { NextPage } from 'next'
import { mapOptions } from '../config/google'
import GoogleMap from './GoogleMap'

const ListingMap: NextPage = () => {
  return (
    <>
      <div id="listingMap">
        <GoogleMap options={mapOptions}>
        </GoogleMap>
      </div>
      
      <style jsx>{`
        #listingMap {
          position: relative;
          width: 50%;
        }
      `}</style>
    </>
  )
}

export default ListingMap
