import type {
  Listing,
  ListingDetail,
  ListingAddress
} from '../types/listing_types'
import { Locale, Currency } from '../config'

export interface FormatPriceOptions {
  numberFormatOptions?: Intl.NumberFormatOptions
  displayInterval?: boolean
}

export const LongCurrencyFormat: Intl.NumberFormatOptions = {
  style: 'currency',
  currency: Currency,
  maximumFractionDigits: 0 // (causes 2500.99 to be printed as $2,501)
}

export const ShortCurrencyFormat: Intl.NumberFormatOptions = {
  style: 'currency',
  currency: Currency,
  notation: 'compact'
}

export const ShortDateFormat: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: '2-digit',
  year: 'numeric'
}

export const LongDateFormat: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  month: 'long',
  day: 'numeric'
}

export const DefaultTimeFormat: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true
}

const defaultFormatPriceOptions: FormatPriceOptions = {
  numberFormatOptions: LongCurrencyFormat,
  displayInterval: true
}

export const formatPrice = (
  price: number,
  rental: boolean,
  options: FormatPriceOptions = defaultFormatPriceOptions
) => {
  const opts = { defaultFormatPriceOptions, ...options }
  const priceFormatted = Intl.NumberFormat(
    Locale,
    opts.numberFormatOptions
  ).format(Number(price))
  return opts.displayInterval && rental
    ? `${priceFormatted}/mo`
    : priceFormatted
}

export const formatPriceFromListing = (
  { soldPrice, listPrice, rental }: Listing | ListingDetail,
  options: FormatPriceOptions = {}
) => formatPrice(soldPrice || listPrice, Boolean(rental), options)

export const formatSoldDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString(Locale, ShortDateFormat)

export const formatOpenHouseDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString(Locale, LongDateFormat)

export const formatOpenHouseTime = (dateStr: string) =>
  new Date(dateStr).toLocaleTimeString(Locale, DefaultTimeFormat)

export const getBathrooms = (listing: Listing | ListingDetail): number => {
  return listing.baths || 0
}

export const formatSqft = ({ sqft }: Listing | ListingDetail) =>
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
