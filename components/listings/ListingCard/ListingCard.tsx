import type { NextPage } from 'next'
import type { Listing } from '../../../lib/types'
import Link from 'next/link'
import styles from './ListingCard.module.css'
import {
  formatPrice,
  getBathrooms,
  formatSqft,
  cityStateZip
} from '../../../lib/helpers/listing_helpers'
import ListingCardImage from '../ListingImage/ListingCardImage'

export interface ListingCardProps {
  listing: Listing
}

const ListingCard: NextPage<ListingCardProps> = ({ listing }) => {
  return (
    <Link
      href={`/listing/${listing.listingid}`}
      target='_blank'
      className={styles.link}
    >
      <div className={styles.listingCard}>
        <ListingCardImage listing={listing} />
        <div className={styles.details}>
          <div className={styles.price}>{formatPrice(listing)}</div>
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
    </Link>
  )
}

export default ListingCard
