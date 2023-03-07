import type { NextPage } from 'next'
import type { SortById } from '../../lib/types/listing_service_params_types'
import { useMedia } from 'react-use'
import styles from './SearchResults.module.css'
import ListingResultsHeader from '../../components/listings/ListingResultsHeader/ListingResultsHeader'
import ListingCard from '../../components/listings/ListingCard/ListingCard'
import ListingResultsPagination from '../../components/listings/ListingResultsPagination/ListingResultsPagination'
import { useAppSelector, useAppDispatch } from '../../hooks'
import {
  selectSortBy,
  selectListings,
  selectPagination,
  selectListingSearchRunning,
  setFilterParams,
  doGeospatialSearch,
  searchWithUpdatedFilters
} from '../../store/listingSearch/listingSearchSlice'
import { openModal } from '../../store/application/applicationSlice'
import ListingCardLoader from '../../components/listings/ListingCardLoader/ListingCardLoader'

const SearchResults: NextPage = () => {
  const dispatch = useAppDispatch()
  const isSmallAndUp = useMedia('(min-width: 576px)', false)
  const sortBy = useAppSelector(selectSortBy)
  const listings = useAppSelector(selectListings)
  const pagination = useAppSelector(selectPagination)
  const listingSearchRunning = useAppSelector(selectListingSearchRunning)

  const handleSortMenuChange = (sortById: SortById) => {
    dispatch(setFilterParams({ sort_by: sortById }))
    dispatch(searchWithUpdatedFilters())
  }

  const handlePaginationButtonClick = (pageIndex: number) => {
    dispatch(setFilterParams({ startidx: pageIndex }))
    dispatch(doGeospatialSearch())
  }

  const handleListingCardClick = (url: string, listingId: number) => {
    if (isSmallAndUp) {
      window.open(url, '_blank')
    } else {
      dispatch(
        openModal({
          modalType: 'listingDetail',
          modalProps: { listingId }
        })
      )
    }
  }

  return (
    <div>
      <ListingResultsHeader
        totalListings={pagination.total}
        listingSearchRunning={listingSearchRunning}
        sortBy={sortBy}
        onSortMenuChange={handleSortMenuChange}
      />
      <ul className={styles.searchResultsList}>
        {!listingSearchRunning &&
          listings.map((listing) => (
            <li key={listing.listingid.toString()}>
              <ListingCard
                listing={listing}
                url={`listing/${listing.listingid}`}
                onClick={() =>
                  handleListingCardClick(
                    `listing/${listing.listingid}`,
                    listing.listingid
                  )
                }
              />
            </li>
          ))}

        {listingSearchRunning &&
          [...Array(6)].map((_, i) => (
            <li key={i}>
              <ListingCardLoader />
            </li>
          ))}
      </ul>
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
