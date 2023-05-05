import type {
  Listing,
  ListingDetailListing,
  ListingAddress
} from './types/listing_types'
import { RentalPropertytypeID } from './property_types'

export interface FormatPriceOptions {
  numberFormatOptions?: Intl.NumberFormatOptions
  displayInterval?: boolean
}

export const PropertyStatusTypeEnum = Object.freeze({
  active: 1,
  pending: 2,
  coming_soon: 11,
  temp_off_market: 8,
  contingent: 3,
  expired: 5,
  sale_fail: 6,
  canceled: 4,
  other: 10,
  short_sale: 7,
  sold: 9
})

export const ListingImageSizeEnum = Object.freeze({
  raw: { width: 1600, height: 1600 },
  gallery: { width: 1600, height: 1600 },
  full: { width: 720, height: 540 },
  small: { width: 400, height: 300 },
  thumb: { width: 120, height: 90 }
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
    sold_price,
    listPrice,
    property_type_id
  }: Listing | ListingDetailListing,
  options: FormatPriceOptions = defaultFormatPriceOptions
) => {
  const opts = { defaultFormatPriceOptions, ...options }
  const price = status === 'Sold' ? sold_price : listPrice
  const priceFormatted = Intl.NumberFormat(
    'en-US',
    opts.numberFormatOptions
  ).format(Number(price))
  return opts.displayInterval && property_type_id === RentalPropertytypeID
    ? `${priceFormatted}/mo`
    : priceFormatted
}

export const getBathrooms = (
  listing: Listing | ListingDetailListing
): number => {
  return listing.baths || 0
}

export const formatSqft = ({ sqft }: Listing | ListingDetailListing) =>
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
