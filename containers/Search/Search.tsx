import type { NextPage } from 'next'
import type { FiltersState } from '../../store/filters/filtersTypes'
import { useRef, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks'
import GoogleMapsProvider from '../../context/google_maps_context'
import { AppGoogleMapsLoaderOptions } from '../../config/googleMapsOptions'
import { setFilters } from '../../store/filters/filtersSlice'
import { selectSearchState } from '../../store/filters/filtersSelectors'
import { selectViewType } from '../../store/application/applicationSlice'
import { searchNewLocation } from '../../store/listingSearch/listingSearchSlice'
import { selectListingSearchRunning } from '../../store/listingSearch/listingSearchSelectors'
import styles from './Search.module.css'
import Header from '../../containers/Header/Header'
import SearchResults from '../../containers/SearchResults/SearchResults'
import ListingMap from '../../components/map/ListingMap/ListingMap'

export interface SearchProps {
  searchState?: Partial<FiltersState>
  onListingSearchRunning?: (state: Partial<FiltersState>) => void
}

const Search: NextPage<SearchProps> = ({
  searchState,
  onListingSearchRunning
}) => {
  const dispatch = useAppDispatch()
  const viewType = useAppSelector(selectViewType)
  const listingSearchRunning = useAppSelector(selectListingSearchRunning)
  const currentSearchState = useAppSelector(selectSearchState)
  const searchResultsRef = useRef<HTMLDivElement>(null)
  const resultsClassName =
    viewType === 'list' ? styles.resultsListView : styles.resultsMapView

  useEffect(() => {
    if (searchState) {
      dispatch(setFilters(searchState))
      dispatch(searchNewLocation())
    }
  }, [searchState, dispatch])

  useEffect(() => {
    if (listingSearchRunning) {
      if (searchResultsRef?.current?.scrollTop) {
        searchResultsRef.current.scrollTop = 0
      }
      onListingSearchRunning?.(currentSearchState)
    }
  }, [listingSearchRunning, currentSearchState, onListingSearchRunning])

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
