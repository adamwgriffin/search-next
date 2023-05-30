import type { PropertyType } from '../property_types'

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

export interface IPhotoGalleryImage {
  galleryUrl: string // used for slideshow image
  fullUrl: string // used for listing detail image
  smallUrl: string // used for listing card image
  caption?: string
}

export type PhotoGalleryImageSizes = 'gallery' | 'full' | 'small'

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
  photoGallery: IPhotoGalleryImage[]
}

export interface IListingDetail extends Listing {
  listedDate: Date
  neighborhood: string
  description: string | null
  lotSize: number
  yearBuilt: number
  daysOnMarket: number
}