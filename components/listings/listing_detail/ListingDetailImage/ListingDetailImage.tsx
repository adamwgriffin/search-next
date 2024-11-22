import type { ListingDetail } from '../../../../types/listing_types'
import ListingImageContainer from '../../ListingImageContainer/ListingImageContainer'
import ListingImageContainerElements from '../../ListingImageContainerElements/ListingImageContainerElements'
import FavoriteButton from '../../../../containers/FavoriteButton/FavoriteButton'
import {
  fallbackToDefaultImageOnError,
  getStreetViewImage
} from '../../../../lib/listing_image_helpers'
import styles from './ListingDetailImage.module.css'

export type ListingDetailImageProps = {
  listing: ListingDetail
  onClick?: () => void
}

const handleError = fallbackToDefaultImageOnError('full')

const ListingDetailImage: React.FC<ListingDetailImageProps> = ({
  listing,
  onClick
}) => {
  return (
    <ListingImageContainer>
      <ListingImageContainerElements>
        <FavoriteButton listingId={listing._id} />
      </ListingImageContainerElements>
      <img
        src={
          listing?.photoGallery?.[0]?.fullUrl ||
          getStreetViewImage(listing.latitude, listing.longitude, 768, 483)
        }
        alt='Listing photo'
        className={styles.listingDetailImage}
        onClick={onClick}
        onError={handleError}
      />
    </ListingImageContainer>
  )
}

export default ListingDetailImage
