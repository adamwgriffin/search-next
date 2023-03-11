import type { NextPage } from 'next'
import type { SortById } from '../../lib/types/listing_service_params_types'
import { useMedia } from 'react-use'
import ListingResultsHeader from '../../components/listings/ListingResultsHeader/ListingResultsHeader'
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
      addUrlToBrowserHistory(url)
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
      <ListingCards
        listings={listings}
        listingSearchRunning={listingSearchRunning}
        handleListingCardClick={handleListingCardClick}
      />
      {listings.length > 0 && (
        <ListingResultsPagination
          {...pagination}
          onClick={handlePaginationButtonClick}
        />
      )}
      {/* {listings.length === 0 && (
        <NoResults  />
      )} */}
    </div>
  )
}

export default SearchResults
