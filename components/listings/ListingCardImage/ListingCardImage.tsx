import type { Listing } from '../../../types/listing_types'
import ListingImageContainer from '../ListingImageContainer/ListingImageContainer'
import ListingImageContainerElements from '../ListingImageContainerElements/ListingImageContainerElements'
import FavoriteButton from '../../../containers/FavoriteButton/FavoriteButton'
import {
  fallbackToDefaultImageOnError,
  getStreetViewImage
} from '../../../lib/listing_image_helpers'
import styles from './ListingCardImage.module.css'

export type ListingCardImageProps = {
  listing: Listing
}

const handleError = fallbackToDefaultImageOnError('small')

const ListingCardImage: React.FC<ListingCardImageProps> = ({ listing }) => {
  return (
    <ListingImageContainer>
      <ListingImageContainerElements>
        <FavoriteButton listingId={listing._id} />
      </ListingImageContainerElements>
      <img
        src={
          listing?.photoGallery?.[0]?.smallUrl ||
          getStreetViewImage(listing.latitude, listing.longitude, 533, 300)
        }
        alt='Listing photo'
        className={styles.listingCardImage}
        onError={handleError}
      />
    </ListingImageContainer>
  )
}

export default ListingCardImage
