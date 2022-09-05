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
