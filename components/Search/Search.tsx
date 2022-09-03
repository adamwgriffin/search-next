import type { NextPage } from 'next'
import styles from './Search.module.css'
import GoogleMapsProvider from '../../context/google_maps_context'
import Header from '../Header/Header'
import Filters from '../form/Filters/Filters'
import SearchResults from '../SearchResults/SearchResults'
import ListingMap from '../map/ListingMap/ListingMap'

const Search: NextPage = () => {
  return (
    <GoogleMapsProvider>
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
    </GoogleMapsProvider>
  )
}

export default Search
