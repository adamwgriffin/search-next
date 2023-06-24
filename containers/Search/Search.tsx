import type { NextPage } from 'next'
import type { FiltersState } from '../../store/filters/filtersTypes'
import { useRef, useEffect } from 'react'
import { useEffectOnce } from 'react-use'
import { useAppSelector, useAppDispatch } from '../../hooks'
import GoogleMapsProvider from '../../context/google_maps_context'
import { AppGoogleMapsLoaderOptions } from '../../config/googleMapsOptions'
import { updateSearchUrl } from '../../lib/url'
import { setFilters } from '../../store/filters/filtersSlice'
import { selectListingSearchParams } from '../../store/filters/filtersSelectors'
import { selectViewType } from '../../store/application/applicationSlice'
import { searchNewLocation } from '../../store/listingSearch/listingSearchSlice'
import { selectListingSearchRunning } from '../../store/listingSearch/listingSearchSelectors'
import styles from './Search.module.css'
import Header from '../../containers/Header/Header'
import SearchResults from '../../containers/SearchResults/SearchResults'
import ListingMap from '../../components/map/ListingMap/ListingMap'

export interface SearchProps {
  filtersState?: Partial<FiltersState>
}

const Search: NextPage<SearchProps> = ({ filtersState }) => {
  const dispatch = useAppDispatch()
  const viewType = useAppSelector(selectViewType)
  const listingSearchRunning = useAppSelector(selectListingSearchRunning)
  const listingSearchParams = useAppSelector(selectListingSearchParams)
  const searchResultsRef = useRef<null | HTMLDivElement>(null)
  const resultsClassName =
    viewType === 'list' ? styles.resultsListView : styles.resultsMapView
  
  useEffectOnce(() => {
    if (filtersState) {
      dispatch(setFilters(filtersState))
    }
    dispatch(searchNewLocation())
  })

  useEffect(() => {
    if (searchResultsRef?.current?.scrollTop) {
      searchResultsRef.current.scrollTop = 0;
    }
    if (listingSearchRunning) {
      updateSearchUrl(listingSearchParams)
    }
  }, [listingSearchRunning, listingSearchParams])

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
