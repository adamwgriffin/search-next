import {
  MultiPolygon,
  ViewportLatLngBounds
} from '../store/listingMap/listingMapTypes'
import type { PropertyType } from '../lib/property_types'

export type PropertyStatus = 'active' | 'pending' | 'sold'

export interface ListingAddress {
  line1: string
  line2?: string
  city: string
  state: string
  zip: string
}

export interface PhotoGalleryImage {
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
  feature_name: string
  feature_description?: string
  featureid: number
  subfeatures: SubFeature[]
}

// The _id is added by Mongo automatically, so it's not defined explicityl in the Listing Service version of this type
// definition
export interface PropertDetail {
  _id: string
  name: string
  details: string[]
}

export interface PropertDetailsSection {
  _id: string
  name: string
  description?: string
  details: PropertDetail[]
}

export interface OpenHouse {
  start: string
  end: string
  comments?: string
}

export interface Listing {
  _id: string
  status: PropertyStatus
  listPrice: number
  soldPrice?: number | null
  listedDate: Date
  beds: number
  baths: number
  sqft: number | null
  neighborhood: string
  description: string | null
  address: ListingAddress
  latitude: number
  longitude: number
  rental?: boolean
  photoGallery?: PhotoGalleryImage[]
  openHouses: OpenHouse[]
  placeId?: string
}

export interface ListingDetail extends Listing {
  propertyType: PropertyType
  yearBuilt: number
  soldDate?: Date
  daysOnMarket: number
  propertyDetails?: PropertDetailsSection[]
}

export interface BoundaryRecord {
  _id: string
  name: string
  type: string
  geometry: {
    type: string
    coordinates: MultiPolygon
  }
  placeId: string
}

export interface ListingSearchPagination {
  page: number
  pageSize: number
  numberReturned: number
  numberAvailable: number
  numberOfPages: number
}

export interface ListingSearchBoundaryResponse {
  listings: Listing[]
  pagination: ListingSearchPagination
}

export interface ListingSearchGeocodeResponse
  extends Partial<ListingSearchBoundaryResponse> {
  boundary?: BoundaryRecord
  viewport?: ViewportLatLngBounds
  listingDetail?: ListingDetail
}
