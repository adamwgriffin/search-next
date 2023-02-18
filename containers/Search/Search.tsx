import type { NextPage } from 'next'
import styles from './Search.module.css'
import { useEffectOnce } from 'react-use'
import { useAppSelector, useAppDispatch } from '../../hooks'
import GoogleMapsProvider from '../../context/google_maps_context'
import { selectViewType } from '../../store/application/applicationSlice'
import { doGeospatialGeocodeSearch } from '../../store/listingSearch/listingSearchSlice'
import Header from '../../containers/Header/Header'
import SearchResults from '../../containers/SearchResults/SearchResults'
import ListingMap from '../../components/map/ListingMap/ListingMap'
import { AppGoogleMapsLoaderOptions } from '../../config/googleMapsOptions'

const Search: NextPage = () => {
  const dispatch = useAppDispatch()
  const viewType = useAppSelector(selectViewType)
  const resultsClassName =
    viewType === 'list' ? styles.resultsListView : styles.resultsMapView
  
  // we're just doing a default search on page load for now. eventually we'll want to search based on the url params
  useEffectOnce(() => {
    dispatch(doGeospatialGeocodeSearch())
  })

  return (
    <GoogleMapsProvider loaderOptions={AppGoogleMapsLoaderOptions}>
      <div className={styles.search}>
        <div>
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
