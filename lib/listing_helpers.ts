import type {
  Listing,
  IListingDetail,
  ListingAddress
} from './types/listing_types'

export interface FormatPriceOptions {
  numberFormatOptions?: Intl.NumberFormatOptions
  displayInterval?: boolean
}

// some default sizes used for getting images from google maps streetview when the listing has no gallery
export const ListingStreetViewImageSizeEnum = Object.freeze({
  gallery: { width: 1920, height: 1080 },
  full: { width: 480, height: 540 },
  small: { width: 533, height: 300 },
})

export const LongCurrencyFormat: Intl.NumberFormatOptions = {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0 // (causes 2500.99 to be printed as $2,501)
}

export const ShortCurrencyFormat: Intl.NumberFormatOptions = {
  style: 'currency',
  currency: 'USD',
  notation: 'compact'
}

const defaultFormatPriceOptions: FormatPriceOptions = {
  numberFormatOptions: LongCurrencyFormat,
  displayInterval: true
}

export const formatPrice = (
  {
    status,
    soldPrice,
    listPrice,
    rental
  }: Listing | IListingDetail,
  options: FormatPriceOptions = defaultFormatPriceOptions
) => {
  const opts = { defaultFormatPriceOptions, ...options }
  const price = status === 'sold' ? soldPrice : listPrice
  const priceFormatted = Intl.NumberFormat(
    'en-US',
    opts.numberFormatOptions
  ).format(Number(price))
  return opts.displayInterval && rental
    ? `${priceFormatted}/mo`
    : priceFormatted
}

export const getBathrooms = (
  listing: Listing | IListingDetail
): number => {
  return listing.baths || 0
}

export const formatSqft = ({ sqft }: Listing | IListingDetail) =>
  sqft?.toLocaleString()

export const cityStateZip = (location: ListingAddress) => {
  const { city, state, zip } = location
  return [city.trim(), `${state} ${zip}`.trim()].filter((a) => a).join(', ')
}

export const listingLocationToLatLngLiteral = (
  listing: Listing
): google.maps.LatLngLiteral => {
  return {
    lat: listing?.latitude,
    lng: listing?.longitude
  }
}
