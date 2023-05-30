import type { NextPage } from 'next'
import type { Point } from '@turf/turf'
import type { IPhotoGalleryImage } from '../../../../lib/types/listing_types'
import styles from './ListingDetailImage.module.css'
import ListingMainImage from '../../ListingMainImage/ListingMainImage'

export interface ListingDetailImageProps {
  images: IPhotoGalleryImage[]
  latitude: number
  longitude: number
  onClick?: () => void
}

const ListingDetailImage: NextPage<ListingDetailImageProps> = ({
  images,
  latitude,
  longitude,
  onClick
}) => {
  return (
    <div className={styles.listingDetailImage}>
      <ListingMainImage
        image={images[0]}
        latitude={latitude}
        longitude={longitude}
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
