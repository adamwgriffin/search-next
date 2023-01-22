import { BedsBathsParam } from './listing_service_params_types'
import { CountOption } from './types'

export const countArr = [0, 1, 2, 3, 4, 5]

export const RadioButtonGroups = [
  { param: 'bed_min', label: 'Beds' },
  { param: 'bath_min', label: 'Baths' }
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
