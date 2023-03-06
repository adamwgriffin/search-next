import type { NextPage } from 'next'
import type { Listing } from '../../../lib/types/listing_types'
import Link from 'next/link'
import styles from './ListingCard.module.css'
import {
  formatPrice,
  getBathrooms,
  formatSqft,
  cityStateZip
} from '../../../lib/listing_helpers'
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
          <div>{listing.bedrooms}bd</div>
          <div>{getBathrooms(listing)}ba</div>
          <div>{formatSqft(listing)} sqft</div>
        </div>
        <div>
          <div>
            {listing.location.address}
          </div>
          <div>
            {cityStateZip(listing.location)}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ListingCard
