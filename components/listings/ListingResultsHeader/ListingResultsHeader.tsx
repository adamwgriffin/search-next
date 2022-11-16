import type { NextPage } from 'next'
import styles from './ListingResultsHeader.module.css'
import SortMenu from '../../form/SortMenu/SortMenu'

export interface ListingResultsHeaderProps {
  totalListings: number
  sortBy: number
  onSortMenuChange: (sortById: number) => void
}

const ListingResultsHeader: NextPage<ListingResultsHeaderProps> = ({
  totalListings,
  sortBy,
  onSortMenuChange
}) => {
  return (
    <div className={styles.listingResultsHeader}>
      {totalListings > 0 && (
        <div>{totalListings} {totalListings === 1 ? 'Home' : 'Homes'}</div>
      )}
      <SortMenu sortBy={sortBy} onChange={onSortMenuChange} />
    </div>
  )
}

export default ListingResultsHeader
