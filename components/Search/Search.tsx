import type { NextPage } from 'next'
import styles from './Search.module.css'
import GoogleMapsProvider from '../../context/google_maps_context'
import { useAppSelector } from '../../hooks'
import { selectViewType } from '../../store/application/applicationSlice'
import Header from '../../containers/Header/Header'
import SearchResults from '../../containers/SearchResults/SearchResults'
import ListingMap from '../map/ListingMap/ListingMap'
import { AppGoogleMapsLoaderOptions } from '../../config/googleMapsOptions'

const Search: NextPage = () => {
  const viewType = useAppSelector(selectViewType)
  const resultsClassName =
    viewType === 'list' ? styles.resultsListView : styles.resultsMapView

  return (
    <GoogleMapsProvider loaderOptions={AppGoogleMapsLoaderOptions}>
      <div className={styles.search}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={resultsClassName}>
          <div className={styles.searchResults}>
            <SearchResults />
          </div>
          <div className={styles.listingMap}>
            <ListingMap />
          </div>
        </div>
      </div>
    </GoogleMapsProvider>
  )
}

export default Search
