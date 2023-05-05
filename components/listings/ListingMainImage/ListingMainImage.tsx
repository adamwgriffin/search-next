import type { NextPage } from 'next'
import type { CSSProperties } from 'react'
import type {
  ListingImage,
  ListingImageSizes
} from '../../../lib/types/listing_types'
import { SyntheticEvent } from 'react'
import { ListingImageSizeEnum } from '../../../lib/listing_helpers'

export interface ListingMainImageProps {
  image: ListingImage
  latitude: number
  longitude: number
  size?: ListingImageSizes
  style?: CSSProperties
  className?: string
  alt?: string
  onClick?: () => void
}

const ListingMainImage: NextPage<ListingMainImageProps> = ({
  image,
  latitude,
  longitude,
  size = 'small',
  style = {},
  className = '',
  alt = 'Listing image',
  onClick = () => {}
}) => {
  // if there are no images available for the listing in the listing service response, we can try and get a static image
  // of the location using the google maps street view api, so that the user will at least have one image of the house
  // to look at instead of a generic placeholder image.
  const getStreetViewImage = () => {
    const url = new URL('https://maps.googleapis.com/maps/api/streetview')
    const { width, height } = ListingImageSizeEnum[size]
    url.search = new URLSearchParams({
      location: `${latitude},${longitude}`,
      size: `${width+20}x${height}`,
      // this causes the request to request to return an http error status code if there is no image for the location
      return_error_code: 'true',
      key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!
    }).toString()
    return url.toString()
  }

  const getMainListingImage = () => {
    return image.title === 'NOIMAGE'
      ? getStreetViewImage()
      : image[`${size}_url`]
  }

  // if we receive an http status code for the image response it will trigger the onError event on the image and we can
  // handle it by setting a default placeholder image instead. this is useful for when we are trying to use a google
  // streetview image but none exists for the location we specified. in that case it will return a 400 error and we will
  // fallback to using our default image instead.
  const handleError = (
    event: SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = `/default_listing_image/default_listing_image_${size}.jpg`
  }

  return (
    <img
      src={getMainListingImage()}
      alt={alt}
      style={style}
      className={className}
      onClick={onClick}
      onError={handleError}
    ></img>
  )
}

export default ListingMainImage
