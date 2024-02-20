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
