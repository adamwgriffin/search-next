import type { NextPage } from 'next'
import styles from './SearchResults.module.css'
import ListingResultsHeader from '../../components/listings/ListingResultsHeader/ListingResultsHeader'
import ListingCard from '../../components/listings/ListingCard/ListingCard'
import ListingResultsPagination from '../../components/listings/ListingResultsPagination/ListingResultsPagination'
import { useAppSelector, useAppDispatch } from '../../hooks'
import {
  selectSortBy,
  selectListings,
  selectPagination,
  setSearchParams,
  getNextPageOfListingResults,
  searchWithUpdatedFilters
} from '../../store/listingSearch/listingSearchSlice'

const SearchResults: NextPage = () => {
  const dispatch = useAppDispatch()
  const sortBy = useAppSelector(selectSortBy)
  const listings = useAppSelector(selectListings)
  const pagination = useAppSelector(selectPagination)

  const handleSortMenuChange = (sortById: number) => {
    dispatch(setSearchParams({ sort_by: sortById }))
    dispatch(searchWithUpdatedFilters())
  }

  const handlePaginationButtonClick = (pageIndex: number) => {
    dispatch(setSearchParams({ startidx: pageIndex }))
    dispatch(getNextPageOfListingResults())
  }

  return (
    <div>
      <ListingResultsHeader
        totalListings={pagination.total}
        sortBy={sortBy}
        onSortMenuChange={handleSortMenuChange}
      />
      <ul className={styles.searchResultsList}>
        {listings.map((listing) => (
          <li key={listing.listingid.toString()}>
            <ListingCard listing={listing} />
          </li>
        ))}
      </ul>
      {listings.length > 0 && (
        <ListingResultsPagination {...pagination} onClick={handlePaginationButtonClick} />
      )}
    </div>
  )
}

export default SearchResults
