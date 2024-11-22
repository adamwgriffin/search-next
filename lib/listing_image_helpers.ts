import type { SyntheticEvent } from 'react'
import type {
  Listing,
  ListingDetail,
  PhotoGalleryImage,
  PhotoGalleryImageSizes
} from '../types/listing_types'

export const GoogleMapsStreetViewURL =
  'https://maps.googleapis.com/maps/api/streetview'

// TODO: These sizes don't all seem correct anymore
// some default sizes used for getting images from google maps streetview when
// the listing has no gallery
export const ListingStreetViewImageSizeEnum = Object.freeze({
  gallery: { width: 1920, height: 1080 },
  full: { width: 480, height: 540 },
  small: { width: 533, height: 300 }
})

export const getStreetViewImage = (
  latitude: number,
  longitude: number,
  width: number,
  height: number
) => {
  const url = new URL(GoogleMapsStreetViewURL)
  url.search = new URLSearchParams({
    location: `${latitude},${longitude}`,
    size: `${width}x${height}`,
    // This causes the request to return an http error status code if there is no image for the location
    return_error_code: 'true',
    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!
  }).toString()
  return url.toString()
}

// If there are no images available for the listing, we can try and get a static
// image of the location using the google maps street view api, so that the user
// will at least have one image of the house to look at instead of a generic
// placeholder image.
export const getMainListingImageFallbackToStreetView = (
  listing: Listing | ListingDetail,
  size: PhotoGalleryImageSizes
) => {
  if (typeof listing?.photoGallery?.[0] !== 'undefined') {
    return listing.photoGallery[0][`${size}Url`]
  }
  const { width, height } = ListingStreetViewImageSizeEnum[size]
  return getStreetViewImage(listing.latitude, listing.longitude, width, height)
}

// If we receive an http status code for the image response it will trigger the
// onError event on the image and we can handle it by setting a default
// placeholder image instead. This is useful for when we are trying to use a
// google streetview image but none exists for the location we specified. In
// that case it will return a 400 error and we will fallback to using our
// default image instead.
export const fallbackToDefaultImageOnError =
  (size: PhotoGalleryImageSizes) =>
  (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = `/default_listing_image/default_listing_image_${size}.jpg`
  }
