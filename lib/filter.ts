import type { CountOption } from './types'
import type { FeaturesParams } from './types/listing_service_params_types'

export const LotSizeValues: Array<CountOption> = [
  {
    label: 'No Min',
    value: 0
  },
  {
    label: '2,000+ sqft',
    value: 2000
  },
  {
    label: '3,000+ sqft',
    value: 3000
  },
  {
    label: '5,000+ sqft',
    value: 5000
  },
  {
    label: '7,500+ sqft',
    value: 7500
  },
  {
    label: '0.25+ acre',
    value: 10890
  },
  {
    label: '0.5+ acre',
    value: 21780
  },
  {
    label: '1+ acre',
    value: 43560
  },
  {
    label: '2+ acre',
    value: 87120
  },
  {
    label: '5+ acre',
    value: 217800
  },
  {
    label: '10+ acre',
    value: 435600
  }
]

type FeatureLabels = {
  [key in keyof FeaturesParams]: string
}

export const FeatureLabels: FeatureLabels = {
  waterfront: 'Waterfront',
  view: 'Views',
  fireplace: 'Fireplace',
  basement: 'Basement',
  garage: 'Garage',
  new_construction: 'New Construction',
  pool: 'Pool',
  air_conditioning: 'Air Conditioning'
}
