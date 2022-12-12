import type { NextPage } from 'next'
import type { Listing } from '../../../lib/types'
import styles from './ListingCardImage.module.css'
import ListingMainImage from '../ListingMainImage/ListingMainImage'
import FavoriteButton from '../FavoriteButton/FavoriteButton'

export interface ListingCardImageProps {
  listing: Listing
}

const ListingCardImage: NextPage<ListingCardImageProps> = ({ listing }) => {
  return (
    <div className={styles.listingCardImage}>
      <div className={styles.favoriteButtonContainer}>
        <FavoriteButton />
      </div>
      <ListingMainImage
        image={listing.image[0]}
        location={listing.location}
        size='small'
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '13rem',
          borderRadius: '0.5rem',
        }}
      />
    </div>
  )
}

export default ListingCardImage
