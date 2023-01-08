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
  const totalListingsMessage = () =>
    `${totalListings.toLocaleString()} ${
      totalListings === 1 ? 'Home' : 'Homes'
    }`

  return (
    <div className={styles.listingResultsHeader}>
      <div>
        {!listingSearchRunning && totalListings > 0 && totalListingsMessage()}
        {listingSearchRunning && (
          <ContentLoader width={'118px'} height={'19px'}>
            <rect x='0' y='0' rx='6px' width='118px' height='19px' />
          </ContentLoader>
        )}
      </div>
      <SortMenu sortBy={sortBy} onChange={onSortMenuChange} />
    </div>
  )
}

export default ListingResultsHeader
