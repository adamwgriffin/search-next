import type { NextPage } from 'next'
import type {
  ListingLocation,
  ListingImage
} from '../../../../lib/types/listing_types'
import styles from './ListingDetailImage.module.css'
import ListingMainImage from '../../ListingMainImage/ListingMainImage'

export interface ListingDetailImageProps {
  images: ListingImage[]
  location: ListingLocation
  onClick?: () => void
}

const ListingDetailImage: NextPage<ListingDetailImageProps> = ({
  images,
  location,
  onClick
}) => {
  return (
    <div className={styles.listingDetailImage}>
      <ListingMainImage
        image={images[0]}
        location={location}
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
