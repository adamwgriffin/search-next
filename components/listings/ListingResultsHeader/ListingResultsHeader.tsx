import type { NextPage } from 'next'
import type { SortById } from '../../../lib/listing_service_params_types'
import styles from './ListingResultsHeader.module.css'
import ContentLoader from 'react-content-loader'
import SortMenu from '../../form/SortMenu/SortMenu'

export interface ListingResultsHeaderProps {
  totalListings: number
  listingSearchRunning: boolean
  sortBy: SortById
  onSortMenuChange: (sortById: SortById) => void
}

const ListingResultsHeader: NextPage<ListingResultsHeaderProps> = ({
  totalListings,
  listingSearchRunning,
  sortBy,
  onSortMenuChange
}) => {
  return (
    <div className={styles.listingResultsHeader}>
      {!listingSearchRunning && totalListings > 0 && (
        <div>
          {totalListings} {totalListings === 1 ? 'Home' : 'Homes'}
        </div>
      )}
      {listingSearchRunning && (
        <ContentLoader width={'7.4rem'} height={'1.2rem'}>
          <rect x='0' y='0' rx='0.375rem' width='7.4rem' height='1.2rem' />
        </ContentLoader>
      )}
      <SortMenu sortBy={sortBy} onChange={onSortMenuChange} />
    </div>
  )
}

export default ListingResultsHeader
