import type { NextPage } from 'next'
import type { ListingDetail } from '../../../../types/listing_types'
import styles from './ListingDetailImage.module.css'
import ListingImageContainer from '../../ListingImageContainer/ListingImageContainer'
import ListingImageContainerElements from '../../ListingImageContainerElements/ListingImageContainerElements'
import ListingMainImage from '../../ListingMainImage/ListingMainImage'
import FavoriteButton from '../../../../containers/FavoriteButton/FavoriteButton'

export interface ListingDetailImageProps {
  listing: ListingDetail
  onClick?: () => void
}

const ListingDetailImage: NextPage<ListingDetailImageProps> = ({
  listing,
  onClick
}) => {
  return (
    <div className={styles.listingDetailImage}>
      <ListingImageContainer>
        <ListingImageContainerElements>
          <FavoriteButton listingId={listing._id} />
        </ListingImageContainerElements>
        <ListingMainImage
          image={listing?.photoGallery?.[0]}
          latitude={listing.latitude}
          longitude={listing.longitude}
          size='full'
          style={{
            objectFit: 'cover',
            cursor: 'pointer',
            width: '100%',
            height: '100%',
            borderRadius: '0.5rem'
          }}
          onClick={onClick}
        />
      </ListingImageContainer>
    </div>
  )
}

export default ListingDetailImage
