import type { NextPage } from 'next'
import type { SortFilters } from '../../store/filters/filtersTypes'
import { useMedia } from 'react-use'
import styles from './SearchResults.module.css'
import ListingResultsHeader from '../../components/listings/ListingResultsHeader/ListingResultsHeader'
import ListingResultsPagination from '../../components/listings/ListingResultsPagination/ListingResultsPagination'
import { useAppSelector, useAppDispatch } from '../../hooks'
import {
  searchCurrentLocation,
  searchWithUpdatedFilters,
  setHighlightedMarker
} from '../../store/listingSearch/listingSearchSlice'
import {
  selectListings,
  selectPagination,
  selectListingSearchRunning,
} from '../../store/listingSearch/listingSearchSelectors'
import { setFilters, clearFilters } from '../../store/filters/filtersSlice'
import { selectSortBy, selectSearchType } from '../../store/filters/filtersSelectors'
import { openModal } from '../../store/application/applicationSlice'
import { addUrlToBrowserHistory } from '../../lib/url'
import ListingCards from '../../components/listings/ListingCards/ListingCards'
import NoResults from '../../components/listings/NoResults/NoResults'

const SearchResults: NextPage = () => {
  const dispatch = useAppDispatch()
  const isSmallAndUp = useMedia('(min-width: 576px)', false)
  const sortBy = useAppSelector(selectSortBy)
  const searchType = useAppSelector(selectSearchType)
  const listings = useAppSelector(selectListings)
  const pagination = useAppSelector(selectPagination)
  const listingSearchRunning = useAppSelector(selectListingSearchRunning)

  const handleSortMenuChange = (sortParams: SortFilters) => {
    dispatch(setFilters(sortParams))
    dispatch(searchWithUpdatedFilters())
  }

  const handlePaginationButtonClick = (pageIndex: number) => {
    dispatch(setFilters({ pageIndex }))
    dispatch(searchCurrentLocation())
  }

  const handleListingCardClick = (url: string, listingId: string) => {
    if (isSmallAndUp) {
      window.open(url, '_blank')
    } else {
      dispatch(
        openModal({
          modalType: 'listingDetail',
          modalProps: { listingId }
        })
      )
      addUrlToBrowserHistory(url)
    }
  }

  const handleListingCardMouseEnter = (listingId: string) => {
    dispatch(setHighlightedMarker(listingId))
  }

  const handleListingCardMouseLeave = () => {
    dispatch(setHighlightedMarker(null))
  }

  const handleClearAll = () => {
    dispatch(clearFilters())
    dispatch(searchWithUpdatedFilters())
  }

  return (
    <div className={styles.searchResults}>
      <ListingResultsHeader
        totalListings={pagination.total}
        listingSearchRunning={listingSearchRunning}
        sortBy={sortBy}
        searchType={searchType}
        onSortMenuChange={handleSortMenuChange}
      />
      {(listings.length > 0 || listingSearchRunning) && (
        <ListingCards
          listings={listings}
          listingSearchRunning={listingSearchRunning}
          onListingCardClick={handleListingCardClick}
          onListingCardMouseEnter={handleListingCardMouseEnter}
          onListingCardMouseLeave={handleListingCardMouseLeave}
        />
      )}
      {listings.length === 0 && !listingSearchRunning && (
        <NoResults onClearFiltersClick={handleClearAll} />
      )}
      {listings.length > 0 && (
        <ListingResultsPagination
          {...pagination}
          onClick={handlePaginationButtonClick}
        />
      )}
    </div>
  )
}

export default SearchResults
