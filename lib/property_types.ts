export type PropertyType =
  | 'single-family'
  | 'condo'
  | 'townhouse'
  | 'manufactured'
  | 'land'
  | 'multi-family'

export type PropertyTypeIDArray = Array<PropertyType>


export interface PropertyTypeConfig {
  id: PropertyType
  label: string
}

// TODO: this is no longer going to be a property type
export const RentalPropertytypeID = 6

export const PropertyTypes: PropertyTypeConfig[] = Object.seal([
  {
    id: 'single-family',
    label: 'House'
  },
  {
    id: 'condo',
    label: 'Condo'
  },
  {
    id: 'townhouse',
    label: 'Townhouse'
  },
  {
    id: 'manufactured',
    label: 'Manufactured'
  },
  {
    id: 'land',
    label: 'Land'
  },
  {
    id: 'multi-family',
    label: 'Multi-Family'
  }
])
