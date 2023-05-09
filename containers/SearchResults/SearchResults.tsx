import type { NextPage } from 'next'
import type { SortParams } from '../../lib/types/listing_service_params_types'
import { useMedia } from 'react-use'
import styles from './SearchResults.module.css'
import ListingResultsHeader from '../../components/listings/ListingResultsHeader/ListingResultsHeader'
import ListingResultsPagination from '../../components/listings/ListingResultsPagination/ListingResultsPagination'
import { useAppSelector, useAppDispatch } from '../../hooks'
import {
  selectSortBy,
  selectListings,
  selectPagination,
  selectListingSearchRunning,
  setFilterParams,
  setHighlightedMarker,
  doGeospatialSearch,
  searchWithUpdatedFilters,
  clearFilters
} from '../../store/listingSearch/listingSearchSlice'
import { openModal } from '../../store/application/applicationSlice'
import { addUrlToBrowserHistory } from '../../lib/util'
import ListingCards from '../../components/listings/ListingCards/ListingCards'
import NoResults from '../../components/listings/NoResults/NoResults'

const SearchResults: NextPage = () => {
  const dispatch = useAppDispatch()
  const isSmallAndUp = useMedia('(min-width: 576px)', false)
  const sortBy = useAppSelector(selectSortBy)
  const listings = useAppSelector(selectListings)
  const pagination = useAppSelector(selectPagination)
  const listingSearchRunning = useAppSelector(selectListingSearchRunning)

  const handleSortMenuChange = (sortParams: SortParams) => {
    dispatch(setFilterParams(sortParams))
    dispatch(searchWithUpdatedFilters())
  }

  const handlePaginationButtonClick = (pageIndex: number) => {
    dispatch(setFilterParams({ page_index: pageIndex }))
    dispatch(doGeospatialSearch())
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
