// range numbers for SqftOptionRanges represent: [start, end, increment by]. the end number is
// exclusive, so we have to add 1
export const SqftOptionRanges = Object.freeze([
  [100, 901, 100],
  [1000, 10001, 1000]
])

export const LotSizeSqftOptions = Object.freeze([2000, 4500, 6500, 8000, 10890, 21780])

export const LotSizeAcreOptions = Object.freeze([.25, .5, 1, 2, 3, 4, 5, 10, 40, 100])
