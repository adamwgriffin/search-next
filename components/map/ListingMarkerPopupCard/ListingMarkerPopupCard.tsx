import type { NextPage } from 'next'
import Link from 'next/link'
import type { Listing } from '../../../lib/types'
import styles from './ListingMarkerPopupCard.module.css'
import {
  formatPrice,
  getBathrooms,
  formatSqft,
  cityStateZip
} from '../../../lib/helpers/listing_helpers'
import ListingMainImage from '../../listings/ListingMainImage/ListingMainImage'

export interface ListingMarkerPopupCardProps {
  listing: Listing
}

const ListingMarkerPopupCard: NextPage<ListingMarkerPopupCardProps> = ({
  listing
}) => {
  return (
    <Link
      href={`/listing/${listing.listingid}`}
      target='_blank'
      className={styles.link}
    >
      <div className={styles.listingMarkerPopupCard}>
        <ListingMainImage
          image={listing.image[0]}
          location={listing.location}
          size='small'
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '8rem',
            borderTopLeftRadius: '0.5rem',
            borderTopRightRadius: '0.5rem'
          }}
        />
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

export default ListingMarkerPopupCard
