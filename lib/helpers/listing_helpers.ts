import type {
  Listing,
  ListingDetailListing,
  ListingLocation
} from '../types/listing_types'
import { RentalPropertytypeID } from '../property_types'

export interface FormatPriceOptions {
  numberFormatOptions?: Intl.NumberFormatOptions
  displayInterval?: boolean
}

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
    list_price,
    property_type_id
  }: Listing | ListingDetailListing,
  options: FormatPriceOptions = defaultFormatPriceOptions
) => {
  const opts = { defaultFormatPriceOptions, ...options }
  const price = status === 'Sold' ? sold_price : list_price
  const priceFormatted = Intl.NumberFormat(
    'en-US',
    opts.numberFormatOptions
  ).format(price)
  return opts.displayInterval && property_type_id === RentalPropertytypeID
    ? `${priceFormatted}/mo`
    : priceFormatted
}

export const getBathrooms = (
  listing: Listing | ListingDetailListing
): number => {
  return (
    listing.bathroom_details.bathrooms_display ||
    listing.bathroom_details.total_bathrooms ||
    listing.bathrooms ||
    0
  )
}

const f = (n: number) => n.toLocaleString()

export const formatSqft = ({
  sqr_footage,
  sqr_foot_min,
  sqr_foot_max
}: Listing | ListingDetailListing) => {
  if (sqr_footage) {
    return f(sqr_footage)
  } else if (sqr_foot_min && sqr_foot_max && sqr_foot_max < 50000) {
    return `${f(sqr_foot_min)} - ${f(sqr_foot_max)}`
  } else if (sqr_foot_min && sqr_foot_max && sqr_foot_max >= 50000) {
    return `${f(sqr_foot_min)}+`
  }
}

export const cityStateZip = (location: ListingLocation) => {
  const { city, state, zip } = location
  return [city.trim(), `${state} ${zip}`.trim()].filter((a) => a).join(', ')
}

export const listingLocationToLatLngLiteral = (
  location: ListingLocation
): google.maps.LatLngLiteral => {
  return {
    lat: +location?.latitude,
    lng: +location?.longitude
  }
}
