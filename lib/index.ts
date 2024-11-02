import get from 'lodash/get'

export const objectsValuesEqual = (
  obj1: object,
  obj2: object,
  attrs: string[]
): boolean => {
  return attrs.every((attr) => {
    return get(obj1, attr) === get(obj2, attr)
  })
}

import { DefaultPageSize } from '../config'
import type { PaginationParams } from '../zod_schemas/listingSearchParamsSchema'

export const getPaginationParams = (
  query: Partial<PaginationParams>
): PaginationParams => {
  return {
    page_size: Number(query.page_size) || DefaultPageSize,
    page_index: Number(query.page_index) || 0
  }
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))
