import type { NextPage } from 'next'
import type { CSSProperties } from 'react'
import type { Listing } from '../../../lib/types/listing_types'
import {
  formatPrice,
  ShortCurrencyFormat,
  getBathrooms,
  formatSqft,
  cityStateZip
} from '../../../lib/listing_helpers'
import styles from './ListingMarkerContent.module.css'
import Link from 'next/link'
import ListingMainImage from '../../listings/ListingMainImage/ListingMainImage'

export interface ListingMarkerContentProps {
  listing: Listing
  link: string
  highlighted?: boolean
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
  link,
  highlighted = false
}) => {
  const priceAbbreviated = formatPrice(listing, {
    numberFormatOptions: ShortCurrencyFormat,
    displayInterval: false
  })
  const listingMarkerClassName = highlighted
    ? styles.listingMarkerHighlighted
    : styles.listingMarker

  return (
    // we're only using a link here so that we can change the color of the marker depending on whether it has been
    // visited in the browser history. the actual action taken when clicking the link is handled programmatically, which
    // is why we're using preventDefault.
    <Link
      href={link}
      className={styles.link}
      onClick={(e) => e.preventDefault()}
    >
      <div className={listingMarkerClassName}>
        <div className={styles.icon}>{priceAbbreviated}</div>
        <div className={styles.popup}>
          <ListingMainImage
            image={listing.photoGallery[0]}
            latitude={listing.latitude}
            longitude={listing.longitude}
            size='small'
            style={listingMainImageStyles}
          />
          <div className={styles.details}>
            <div className={styles.price}>{formatPrice(listing)}</div>
            <div className={styles.bedBathSqft}>
              <div>{listing.beds}bd</div>
              <div>{getBathrooms(listing)}ba</div>
              <div>{formatSqft(listing)} sqft</div>
            </div>
            <div className={styles.address}>
              <div className={styles.addressLine1}>{listing.address.line1}</div>
              <div className={styles.addressLine2}>
                {cityStateZip(listing.address)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ListingMarkerContent
