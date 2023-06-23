import type { NextPage } from 'next'
import styles from './Search.module.css'
import { useRef, useEffect } from 'react'
import { useEffectOnce } from 'react-use'
import { useAppSelector, useAppDispatch } from '../../hooks'
import GoogleMapsProvider from '../../context/google_maps_context'
import { selectViewType } from '../../store/application/applicationSlice'
import { searchNewLocation } from '../../store/listingSearch/listingSearchSlice'
import { selectListingSearchRunning } from '../../store/listingSearch/listingSearchSelectors'
import Header from '../../containers/Header/Header'
import SearchResults from '../../containers/SearchResults/SearchResults'
import ListingMap from '../../components/map/ListingMap/ListingMap'
import { AppGoogleMapsLoaderOptions } from '../../config/googleMapsOptions'

const Search: NextPage = () => {
  const dispatch = useAppDispatch()
  const viewType = useAppSelector(selectViewType)
  const listingSearchRunning = useAppSelector(selectListingSearchRunning)
  const searchResultsRef = useRef<null | HTMLDivElement>(null)
  const resultsClassName =
    viewType === 'list' ? styles.resultsListView : styles.resultsMapView
  
  // we're just doing a default search on page load for now. eventually we'll want to search based on the url params
  useEffectOnce(() => {
    dispatch(searchNewLocation())
  })

  useEffect(() => {
    if (searchResultsRef?.current?.scrollTop) {
      searchResultsRef.current.scrollTop = 0;
    }
  }, [listingSearchRunning])

  return (
    <GoogleMapsProvider loaderOptions={AppGoogleMapsLoaderOptions}>
      <div className={styles.search}>
        <div>
          <Header />
        </div>
        <div className={resultsClassName}>
          <div ref={searchResultsRef} className={styles.searchResults}>
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
