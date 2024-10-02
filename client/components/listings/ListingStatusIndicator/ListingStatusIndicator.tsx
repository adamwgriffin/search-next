import type { NextPage } from 'next'
import type { PropertyStatus } from '../../../types/listing_types'
import styles from './ListingStatusIndicator.module.css'

export interface ListingStatusIndicatorProps {
  status: PropertyStatus
}

export const StatusLabels = {
  active: 'Active',
  pending: 'Pending',
  sold: 'Sold'
}

const ListingStatusIndicator: NextPage<ListingStatusIndicatorProps> = ({
  status,
}) => {
  const statusClass = () => {
    switch (status) {
      case 'active':
        return styles.statusActive
      case 'sold':
        return styles.statusSold
      default:
        return styles.status
    }
  }

  return (
    <div
      className={statusClass()}
    >
      {StatusLabels[status]}
    </div>
  )
}

export default ListingStatusIndicator
