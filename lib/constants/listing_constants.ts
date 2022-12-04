export const PropertyStatusTypes = Object.freeze({
  active: 1,
  pending: 2,
  coming_soon: 11,
  temp_off_market: 8,
  contingent: 3,
  expired: 5,
  sale_fail: 6,
  canceled: 4,
  other: 10,
  short_sale: 7,
  sold: 9
})

export const PropertyStatusTypeIds = Object.freeze(
  Object.values(PropertyStatusTypes).sort((a, b) => a - b)
)

export const ListingImageSizeEnum = Object.freeze({
  raw: { width: 1600, height: 1600 },
  gallery: { width: 1600, height: 1600 },
  full: { width: 720, height: 540 },
  small: { width: 400, height: 300 },
  thumb: { width: 120, height: 90 }
})
