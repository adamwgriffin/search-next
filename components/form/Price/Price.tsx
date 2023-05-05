import type { NextPage } from 'next'
import type { PriceRangeParams } from '../../../lib/types/listing_service_params_types'
import styles from './Price.module.css'
import formStyles from '../../../styles/forms.module.css'
import { NumericFormat } from 'react-number-format'
import InputRangeSeparator from '../../design_system/InputRangeSeparator/InputRangeSeparator'

export interface PriceProps {
  priceRange: PriceRangeParams
  onFocus?: () => void
  onBlur?: () => void
  onChange?: (priceRange: Partial<PriceRangeParams>) => void
}

// passing null to NumericFormat.value does not clear the input but "" does for some reason
const normalizePrice = (price: number | null) => (price === null ? '' : price)

const Price: NextPage<PriceProps> = ({
  priceRange,
  onFocus,
  onBlur,
  onChange
}) => {
  return (
    <fieldset className={styles.price}>
      <legend className={styles.legend}>Price Range</legend>
      <label htmlFor='price_min' className={formStyles.accessibleLabel}>
        Min Price
      </label>
      <NumericFormat
        prefix={'$'}
        thousandSeparator=','
        allowNegative={false}
        decimalScale={0}
        value={normalizePrice(priceRange.price_min)}
        onValueChange={(v) => onChange?.({ price_min: v.floatValue })}
        placeholder='Min'
        className={formStyles.input}
        id='price_min'
        autoComplete='off'
        onFocus={onFocus}
        onBlur={onBlur}
        inputMode='numeric'
      />
      <InputRangeSeparator />
      <label htmlFor='price_max' className={formStyles.accessibleLabel}>
        Max Price
      </label>
      <NumericFormat
        prefix={'$'}
        thousandSeparator=','
        allowNegative={false}
        decimalScale={0}
        value={normalizePrice(priceRange.price_max)}
        onValueChange={(v) => onChange?.({ price_max: v.floatValue })}
        placeholder='Max'
        className={formStyles.input}
        id='price_max'
        autoComplete='off'
        onFocus={onFocus}
        onBlur={onBlur}
        inputMode='numeric'
      />
    </fieldset>
  )
}

export default Price
