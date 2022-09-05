import i18n from '@/plugins/i18n'

export const roundHundredths = (n) => {
  return Math.round(100 * n) / 100
}

export const invalidNumber = (n) => {
  return (typeof n === 'undefined') || ['NaN', NaN, null, ''].includes(n)
}

export const invalidPrice = (price) => {
  return invalidNumber(price) || ['No Max Price', 'No Min Price'].includes(price)
}

export const stripFormattingFromNumberString = (n) => {
  return typeof n === 'string' ? n.replace(/[^0-9.-]+/g, "") : n
}

export const formatPrice = (price) => {
  if (invalidPrice(price)) return ''
  return i18n.n(stripFormattingFromNumberString(price), 'currency')
}

export const formatNumber = (number) => {
  if (invalidNumber(number)) return ''
  return i18n.n(stripFormattingFromNumberString(number))
}
