import { BedsBathsParam } from './types/listing_service_params_types'
import { CountOption } from './types'

export const DefaultBedBathCount = [0, 1, 2, 3, 4, 5]

export const RadioButtonGroups = [
  { param: 'beds_min', label: 'Beds' },
  { param: 'baths_min', label: 'Baths' }
]

export const countOptions = (
  param: string,
  countArr: number[],
  bedsAndBaths: BedsBathsParam
): CountOption[] => {
  return countArr.map((c) => ({
    label: c ? `${c}+` : 'Any',
    value: c,
    checked: c === Number(bedsAndBaths[param as keyof BedsBathsParam])
  }))
}
