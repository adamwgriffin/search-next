import type {
  Listing,
  IListingDetail,
  ListingAddress
} from './types/listing_types'

export interface FormatPriceOptions {
  numberFormatOptions?: Intl.NumberFormatOptions
  displayInterval?: boolean
}

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
    soldPrice,
    listPrice,
  }: Listing | IListingDetail,
  options: FormatPriceOptions = defaultFormatPriceOptions
) => {
  const opts = { defaultFormatPriceOptions, ...options }
  const price = status === 'sold' ? soldPrice : listPrice
  const priceFormatted = Intl.NumberFormat(
    'en-US',
    opts.numberFormatOptions
  ).format(Number(price))
  // TODO: add rental back when that's finished in the service
  // return opts.displayInterval && property_type_id === RentalPropertytypeID
  //   ? `${priceFormatted}/mo`
  //   : priceFormatted
  return priceFormatted
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
