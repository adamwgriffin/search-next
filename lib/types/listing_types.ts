import { PropertyTypeID } from '../property_types'

export interface ListingLocation {
  address: string
  address2: string | null
  city: string
  state: string
  zip: string
  county: string
  country_code: string
  latitude: string
  longitude: string
}

export interface ListingBathroomDetails {
  bathrooms_display: number 
  full_baths: number
  half_baths: number
  one_quarter_baths: number | null
  partial_baths: number | null
  three_quarter_baths: number
  total_bathrooms: number
}

export interface ListingImage {
  raw_url: string
  gallery_url: string
  full_url: string
  small_url: string
  thumb_url: string
  title: string
}

export type ListingImageSizes = 'raw' | 'gallery' | 'full' | 'small' | 'thumb'

export interface Listing {
  listingid: number
  location: ListingLocation
  bedrooms: number
  bathrooms: number
  bathroom_details: ListingBathroomDetails
  sqr_footage: number | null
  sqr_foot_min: number | null
  sqr_foot_max: number | null
  status: string
  list_price: number
  sold_price: number | null
  image: ListingImage[]
  property_type_id: PropertyTypeID
}

export interface ListingDetailListing {
  pstatus_id: number
  status_name_for_view: string
  images: ListingImage[]
  location: ListingLocation
  neighborhood: string
  status: string
  list_price: number
  sold_price: number
  property_type_id: PropertyTypeID
  property_type: string
  bedrooms: number
  bathrooms: number
  bathroom_details: ListingBathroomDetails
  sqr_footage: number | null
  sqr_foot_min: number | null
  sqr_foot_max: number | null
  comments: string | null
  days_on_market?: number | null
  year_build: number
  mlsnumber: string
}
