import { PropertyTypeID } from '../property_types'

export interface ListingAddress {
  line1: string
  line2: string | null
  city: string
  state: string
  zip: string
  county: string
  country_code: string
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

export interface SubFeature {
  subfeature_name: string
  subfeatureid: number
}

export interface Feature {
  subfeatures: SubFeature[]
  feature_name: string
  feature_description: string
  featureid: number
}

export interface Listing {
  _id: string
  address: ListingAddress
  beds: number
  baths: number
  bathroom_details: ListingBathroomDetails
  sqft: number | null
  status: string
  listPrice: number
  sold_price: number | null
  image: ListingImage[]
  property_type_id: PropertyTypeID
  latitude: number
  longitude: number
}

export interface ListingDetailListing {
  pstatus_id: number
  status_name_for_view: string
  images: ListingImage[]
  address: ListingAddress
  neighborhood: string
  status: string
  listPrice: number
  sold_price: number
  property_type_id: PropertyTypeID
  property_type: string
  beds: number
  baths: number
  bathroom_details: ListingBathroomDetails
  feature_count: number
  features: Feature[]
  sqft: number | null
  description: string | null
  days_on_market?: number | null
  year_build: number
  mlsnumber: string
}
