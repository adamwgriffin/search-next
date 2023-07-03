import type { NextPage } from 'next'
import GoogleMapsProvider from '../../context/google_maps_context'
import { AppGoogleMapsLoaderOptions } from '../../config/googleMapsOptions'
import Link from 'next/link'
import styles from './Home.module.css'

const Home: NextPage = () => {
  return (
    <GoogleMapsProvider loaderOptions={AppGoogleMapsLoaderOptions}>
      <div className={styles.home}>
        <h1>Home Page</h1>
        <p>Welcome!</p>
        <p>
          <Link href='/homes'>Search Fremont</Link>
        </p>
        <p>
          <Link href='/homes?location=Ballard--Seattle--WA--USA&beds-min=2&baths-min=1'>
            Search Ballard 2+bd 1+ba
          </Link>
        </p>
      </div>
    </GoogleMapsProvider>
  )
}

export default Home
