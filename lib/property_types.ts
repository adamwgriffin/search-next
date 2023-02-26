export type PropertyTypeID = 1 | 2 | 3 | 4 | 6 | 7 | 8 | 9

export type PropertyTypeIDArray = Array<PropertyTypeID>

export type PropertyTypeName =
  | 'residential'
  | 'condo'
  | 'co_op'
  | 'townhouse'
  | 'manufactured'
  | 'land'
  | 'multi_family'

export interface PropertyTypeConfig {
  id: PropertyTypeID
  label: string
}

export type PropertyTypesInterface = Record<PropertyTypeName, PropertyTypeConfig>

export const RentalPropertytypeID:PropertyTypeID = 6

export const PropertyTypes: PropertyTypesInterface = Object.seal({
  residential: {
    id: 1,
    label: 'House'
  },
  condo: {
    id: 2,
    label: 'Condo'
  },
  co_op: {
    id: 8,
    label: 'Co-Op'
  },
  townhouse: {
    id: 9,
    label: 'Townhouse'
  },
  manufactured: {
    id: 4,
    label: 'Manufactured'
  },
  land: {
    id: 3,
    label: 'Land'
  },
  multi_family: {
    id: 7,
    label: 'Multi-Family'
  }
})

export const DefaultPropertyTypes = ['residential', 'condo', 'co_op', 'townhouse'].map(
  (t) => PropertyTypes[t as keyof typeof PropertyTypes].id as PropertyTypeID
)
