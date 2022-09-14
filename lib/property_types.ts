export interface PropertyTypesInterface {
  readonly id: number
  readonly name: string
  readonly label: string
}

export const PropertyTypes: ReadonlyArray<PropertyTypesInterface> = Object.freeze([
  {
    id: 1,
    name: 'residential',
    label: 'Home'
  },
  {
    id: 2,
    name: 'condo',
    label: 'Condo'
  },
  {
    id: 8,
    name: 'co_op',
    label: 'Co-Op'
  },
  {
    id: 9,
    name: 'townhouse',
    label: 'Townhouse'
  },
  {
    id: 4,
    name: 'manufactured',
    label: 'Manufactured'
  },
  {
    id: 3,
    name: 'land',
    label: 'Land'
  },
  {
    id: 5,
    name: 'farm_and_ranch',
    label: 'Farm & Ranch'
  },
  {
    id: 7,
    name: 'multi_family',
    label: 'Multi-Family'
  }
])
