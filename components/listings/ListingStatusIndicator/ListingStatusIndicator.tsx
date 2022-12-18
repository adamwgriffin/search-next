import type { NextPage } from 'next'
import { PropertyStatusTypeEnum } from '../../../lib/constants/listing_constants'
import styles from './ListingStatusIndicator.module.css'

export interface ListingStatusIndicatorProps {
  propertyStatusID: number
  name: string
}

const ListingStatusIndicator: NextPage<ListingStatusIndicatorProps> = ({
  propertyStatusID,
  name
}) => {
  const statusClass = () => {
    switch (propertyStatusID) {
      case PropertyStatusTypeEnum.active:
        return styles.statusActive
      case PropertyStatusTypeEnum.sold:
        return styles.statusSold
      default:
        return styles.status
    }
  }

  return (
    <div
      className={statusClass()}
    >
      {name}
    </div>
  )
}

export default ListingStatusIndicator
