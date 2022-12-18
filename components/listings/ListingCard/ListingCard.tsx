import type { NextPage } from 'next'
import type { Listing } from '../../../lib/types/listing_types'
import Link from 'next/link'
import styles from './ListingCard.module.css'
import {
  formatPrice,
  getBathrooms,
  formatSqft,
  cityStateZip
} from '../../../lib/helpers/listing_helpers'
import ListingCardImage from '../ListingCardImage/ListingCardImage'

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
      <ListingCardImage listing={listing} />
      <div className={styles.details}>
        <div className={styles.price}>{formatPrice(listing)}</div>
        <div className={styles.bedBathSqft}>
          <div className={styles.beds}>{listing.bedrooms}bd</div>
          <div className={styles.baths}>{getBathrooms(listing)}ba</div>
          <div className={styles.sqft}>{formatSqft(listing)} sqft</div>
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
    </Link>
  )
}

export default ListingCard
