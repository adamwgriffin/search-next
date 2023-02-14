import type { CountOption } from './types'

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

export const FeatureLabels = {
  water: 'Waterfront',
  view: 'Views',
  onestory: 'Single-Story Homes',
  has_garage: 'Garage',
  new_const: 'New Construction',
  virtual_tour: 'Virtual Tour',
  luxury: 'Luxury Properties',
  destinations: 'Destinations',
  has_pool: 'Pool',
  senior_community: 'Senior Community'
}
