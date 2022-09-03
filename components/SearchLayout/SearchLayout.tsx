import type { NextPage } from 'next'
import styles from './SearchLayout.module.css'
import { useGoogleMaps } from '../../context/google_maps_context'
import Header from '../Header/Header'
import Filters from '../form/Filters/Filters'
import SearchResults from '../SearchResults/SearchResults'
import ListingMap from '../map/ListingMap/ListingMap'

const SearchLayout: NextPage = () => {
  const { googleLoaded } = useGoogleMaps()

  // we wait to render the content in the view that depends on the google maps api until the api is loaded, that way the
  // "google" variable will be defined for any of the components that need to create instances of google maps classes,
  // e.g., `new google.maps.Map()`
  if (googleLoaded) {
    return (
      <div className={styles.search}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.filters}>
          <Filters />
        </div>
        <div className={styles.searchResults}>
          <SearchResults />
        </div>
        <div className={styles.map}>
          <ListingMap />
        </div>
      </div>
    )
  }
  return null
}

export default SearchLayout
