import type { NextPage } from 'next'
import { mapOptions } from '../config/google'
import GoogleMap from '../components/GoogleMap'

const ListingMap: NextPage = () => {
  return (
    <>
      <div id="listing-map">
        <GoogleMap options={mapOptions}>
        </GoogleMap>
      </div>
      
      <style jsx>{`
        #listing-map {
          position: relative;
          width: 35%;
        }
      `}</style>
    </>
  )
}

export default ListingMap
