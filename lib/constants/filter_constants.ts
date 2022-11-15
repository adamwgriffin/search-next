import pick from 'lodash/pick'
import { sortByEnum } from './search_param_constants'

// range numbers for SqftOptionRanges represent: [start, end, increment by]. the end number is
// exclusive, so we have to add 1
export const SqftOptionRanges = Object.freeze([
  [100, 901, 100],
  [1000, 10001, 1000]
])

export const LotSizeSqftOptions = Object.freeze([2000, 4500, 6500, 8000, 10890, 21780])

export const LotSizeAcreOptions = Object.freeze([.25, .5, 1, 2, 3, 4, 5, 10, 40, 100])

export const DefaultSortOptions = Object.freeze(pick(sortByEnum, [
  'price_desc',
  'price_asc',
  'listing_date_desc',
  'beds_desc',
  'baths_desc',
  'total_square_footage_desc',
  'distance_from_user_lat_lon_asc'
]))
