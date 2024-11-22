import type { Listing } from '../../../types/listing_types'
import {
  formatPriceFromListing,
  ShortCurrencyFormat,
  getBathrooms,
  formatSqft,
  cityStateZip
} from '../../../lib/listing_helpers'
import {
  getStreetViewImage,
  fallbackToDefaultImageOnError
} from '../../../lib/listing_image_helpers'
import styles from './ListingMarkerContent.module.css'
import Link from 'next/link'
import ListingImageContainer from '../../listings/ListingImageContainer/ListingImageContainer'
import ListingImageContainerElements from '../../listings/ListingImageContainerElements/ListingImageContainerElements'
import FavoriteButton from '../../../containers/FavoriteButton/FavoriteButton'

export type ListingMarkerContentProps = {
  listing: Listing
  link: string
  highlighted?: boolean
}

const handleError = fallbackToDefaultImageOnError('small')

const ListingMarkerContent: React.FC<ListingMarkerContentProps> = ({
  listing,
  link,
  highlighted = false
}) => {
  const priceAbbreviated = formatPriceFromListing(listing, {
    numberFormatOptions: ShortCurrencyFormat,
    displayInterval: false
  })
  const listingMarkerClassName = highlighted
    ? styles.listingMarkerHighlighted
    : styles.listingMarker

  return (
    // We're only using a link here so that we can change the color of the
    // marker depending on whether it has been visited in the browser history.
    // The actual action taken when clicking the link is handled
    // programmatically, which is why we're using preventDefault.
    <Link
      href={link}
      className={styles.link}
      onClick={(e) => e.preventDefault()}
    >
      <div className={listingMarkerClassName}>
        <div className={styles.icon}>{priceAbbreviated}</div>
        <div className={styles.popup}>
          <ListingImageContainer>
            <ListingImageContainerElements>
              <FavoriteButton listingId={listing._id} />
            </ListingImageContainerElements>
            <img
              src={
                listing?.photoGallery?.[0]?.fullUrl ||
                getStreetViewImage(
                  listing.latitude,
                  listing.longitude,
                  768,
                  483
                )
              }
              alt='Listing photo'
              className={styles.listingMarkerImage}
              onError={handleError}
            />
          </ListingImageContainer>
          <div className={styles.details}>
            <div className={styles.price}>
              {formatPriceFromListing(listing)}
            </div>
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
