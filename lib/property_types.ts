export interface PropertyTypesInterface {
  residential?: number
  condo?: number
  co_op?: number
  townhouse?: number
  manufactured?: number
  land?: number
  farm_and_ranch?: number
  multi_family?: number
  rental?: number
}

export const PropertyTypeParams: PropertyTypesInterface = Object.freeze({
  residential: 1,
  condo: 2,
  co_op: 8,
  townhouse: 9,
  manufactured: 4,
  land: 3,
  farm_and_ranch: 5,
  multi_family: 7,
  rental: 6
})
