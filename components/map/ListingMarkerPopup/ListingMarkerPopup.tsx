import type { NextPage } from 'next'
import type { Listing } from '../../../lib/types'
import styles from './ListingMarkerPopup.module.css'
import { formatPrice, getBathrooms, formatSqft, cityStateZip  } from '../../../lib/helpers/listing_helpers'

export interface ListingMarkerPopupProps {
  listing: Listing
}

const ListingMarkerPopup: NextPage<ListingMarkerPopupProps> = ({ listing }) => {
  return (
    <div className={styles.listingMarkerPopup}>
      <img
        className={styles.image}
        src={listing.image[0].small_url}
      ></img>
      <div className={styles.details}>
        <div className={styles.price}>
            {formatPrice(listing)}
        </div>
        <div className={styles.stats}>
          <div className={styles.beds}>{listing.bedrooms}bd</div>
          <div className={styles.baths}>{getBathrooms(listing)}ba</div>
          <div className={styles.size}>{formatSqft(listing)} sqft</div>
        </div>
        <div className={styles.address}>
          <div className={styles.addressLine1}>
            {listing.location.address}
          </div>
          <div className={styles.addressLine2}>
            {cityStateZip(listing.location)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingMarkerPopup
