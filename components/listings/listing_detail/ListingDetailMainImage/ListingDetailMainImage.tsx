import { useState, useCallback } from 'react'
import {
  buildSrcSet,
  streetViewImageUrl
} from '../../../../lib/listing_image_helpers'
import styles from './ListingDetailMainImage.module.css'
import { GoogleStreetViewMaxImageSize } from '../../../../config/googleMapsOptions'

export type ListingDetailMainImageProps = {
  imageUrl: string | undefined
  streetViewLat: number
  streetViewLng: number
  alt?: string
  onClick?: () => void
}

const HeightRatio = 16 / 9
const MobileHeightRatio = 1 / 1
const ImageLoadErrorFallbackUrl =
  '/default_listing_image/default_listing_image_full.jpg'
const MobileMediaQuery = '(max-width: 576px)'

const ListingDetailMainImage: React.FC<ListingDetailMainImageProps> = ({
  imageUrl,
  streetViewLat,
  streetViewLng,
  alt = 'Listing photo',
  onClick
}) => {
  const [imageLoadError, setImageLoadError] = useState(false)

  const handleImageLoadError = useCallback(() => setImageLoadError(true), [])

  if (imageLoadError) {
    return (
      <img
        src={ImageLoadErrorFallbackUrl}
        alt={alt}
        className={styles.listingDetailMainImage}
      />
    )
  }

  if (imageUrl) {
    return (
      <picture>
        <source
          media={MobileMediaQuery}
          srcSet={buildSrcSet(imageUrl, MobileHeightRatio)}
        />
        <img
          srcSet={buildSrcSet(imageUrl, HeightRatio)}
          sizes='800px'
          src={imageUrl}
          alt={alt}
          className={styles.listingDetailMainImage}
          onClick={onClick}
          // If there is no image for the location the street view service will
          // return an error status that triggers this
          onError={handleImageLoadError}
        />
      </picture>
    )
  }

  return (
    <picture>
      <source
        media={MobileMediaQuery}
        srcSet={streetViewImageUrl(streetViewLat, streetViewLng)}
      />
      <img
        src={streetViewImageUrl(
          streetViewLat,
          streetViewLng,
          GoogleStreetViewMaxImageSize,
          GoogleStreetViewMaxImageSize / HeightRatio
        )}
        alt={alt}
        className={styles.listingDetailMainImage}
        onError={handleImageLoadError}
      />
    </picture>
  )
}

export default ListingDetailMainImage
