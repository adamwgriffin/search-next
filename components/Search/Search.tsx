import type { NextPage } from 'next'
import styles from './Search.module.css'
import GoogleMapsProvider from '../../context/google_maps_context'
import Header from '../../containers/Header/Header'
import Filters from '../../containers/Filters/Filters'
import SearchResults from '../SearchResults/SearchResults'
import ListingMap from '../map/ListingMap/ListingMap'
import { useAppSelector } from '../../hooks'
import { selectListings } from '../../store/listingSearch/listingSearchSlice'

const Search: NextPage = () => {
  const listings = useAppSelector(selectListings)

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
          <SearchResults listings={listings} />
        </div>
        <div className={styles.map}>
          <ListingMap />
        </div>
      </div>
    </GoogleMapsProvider>
  )
}

export default Search
