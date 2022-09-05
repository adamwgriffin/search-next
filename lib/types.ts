export interface CountOption {
  label: string
  value: number
  checked: boolean
}

export interface ListingLocation {
  address: string 
  city: string
  state: string
  zip: string
}

export interface ListingBathroomDetails {
  bathrooms_display: number 
  full_baths: number
  half_baths: number
  one_quarter_baths: number
  partial_baths: number
  three_quarter_baths: number
  total_bathrooms: number
}

export interface ListingImages {
  small_url: string
}

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
  sold_price: number
  image: ListingImages[]
}
