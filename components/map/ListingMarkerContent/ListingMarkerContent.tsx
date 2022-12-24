import type { NextPage } from 'next'
import type { CSSProperties } from 'react'
import type { Listing } from '../../../lib/types/listing_types'
import {
  formatPrice,
  ShortCurrencyFormat,
  getBathrooms,
  formatSqft,
  cityStateZip
} from '../../../lib/helpers/listing_helpers'
import styles from './ListingMarkerContent.module.css'
import Link from 'next/link'
import ListingMainImage from '../../listings/ListingMainImage/ListingMainImage'

export interface ListingMarkerContentProps {
  listing: Listing
  link: string
}

const listingMainImageStyles: CSSProperties = {
  objectFit: 'cover',
  width: '100%',
  height: '7.5rem',
  borderTopLeftRadius: '.8rem',
  borderTopRightRadius: '.8rem'
}

const ListingMarkerContent: NextPage<ListingMarkerContentProps> = ({
  listing,
  link
}) => {
  const priceAbbreviated = formatPrice(listing, {
    numberFormatOptions: ShortCurrencyFormat,
    displayInterval: false
  })

  return (
    <Link href={link} className={styles.link}>
      <div className={styles.listingMarker}>
        <div className={styles.icon}>{priceAbbreviated}</div>
        <div className={styles.popup}>
          <ListingMainImage
            image={listing.image[0]}
            location={listing.location}
            size='small'
            style={listingMainImageStyles}
          />
          <div className={styles.details}>
            <div className={styles.price}>{formatPrice(listing)}</div>
            <div className={styles.bedBathSqft}>
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
      </div>
    </Link>
  )
}

export default ListingMarkerContent
