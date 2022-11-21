import type { Listing, ListingLocation } from '../types'

export const formatCurrency = (price: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })
  return formatter.format(price)
}

export const formatPrice = ({ status, sold_price, list_price }: Listing) => {
  const listingPrice = status === 'Sold' ? sold_price : list_price
  return formatCurrency(listingPrice)
}

export const getBathrooms = (listing:Listing):number => {
  return listing.bathroom_details.bathrooms_display ||
    listing.bathroom_details.total_bathrooms ||
    listing.bathrooms ||
    0
}

const f = (n: number) => n.toLocaleString()

export const formatSqft = ({ sqr_footage, sqr_foot_min, sqr_foot_max }:Listing) => {
  if (sqr_footage) {
    return f(sqr_footage)
  } else if (sqr_foot_min && sqr_foot_max && sqr_foot_max < 50000) {
    return `${f(sqr_foot_min)} - ${f(sqr_foot_max)}`
  } else if (sqr_foot_min && sqr_foot_max && sqr_foot_max >= 50000) {
    return `${f(sqr_foot_min)}+`;
  }
}

export const cityStateZip = (location: ListingLocation) => {
  const { city, state, zip } = location
  return [
    city.trim(),
    `${state} ${zip}`.trim()
  ]
    .filter(a => a)
    .join(', ')
}

export const listingLocationToLatLngLiteral = (location: ListingLocation): google.maps.LatLngLiteral => {
  return {
     lat: +location?.latitude,
     lng: +location?.longitude
  }
}
