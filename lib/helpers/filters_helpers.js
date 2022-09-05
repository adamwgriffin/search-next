import range from 'lodash/range'

export const optionsFromNumberRanges = (numericOptionsRanges) => {
  return numericOptionsRanges.reduce((numbers, numberRange) => numbers.concat(range(...numberRange)), [])
}
