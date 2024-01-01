import type { NextPage } from 'next'
import type { IListingDetail } from '../../../../lib/types/listing_types'
import styles from './ListingDetailImage.module.css'
import ListingMainImage from '../../ListingMainImage/ListingMainImage'
import FavoriteButton from '../../../../containers/FavoriteButton/FavoriteButton'

export interface ListingDetailImageProps {
  listing: IListingDetail
  onClick?: () => void
}

const ListingDetailImage: NextPage<ListingDetailImageProps> = ({
  listing,
  onClick
}) => {
  return (
    <div className={styles.listingDetailImage}>
      <div className={styles.favoriteButtonContainer}>
        <FavoriteButton listingId={listing._id} />
      </div>
      <ListingMainImage
        image={listing.photoGallery[0]}
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
    </div>
  )
}

export default ListingDetailImage
