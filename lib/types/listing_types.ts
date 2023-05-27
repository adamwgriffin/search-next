import type { PropertyType } from '../property_types'
import type { Point } from '@turf/turf'

export type PropertyStatus = 'active' | 'pending' | 'sold'

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
  sqft: number | null
  status: PropertyStatus
  listPrice: number
  soldPrice: number | null
  propertyType: PropertyType
  latitude: number
  longitude: number
  rental?: boolean
}

export interface IListingDetail extends Listing {
  listedDate: Date
  neighborhood: string
  description: string | null
  lotSize: number
  yearBuilt: number
  daysOnMarket: number
}