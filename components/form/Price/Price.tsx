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
      <label htmlFor='pricemin' className={formStyles.accessibleLabel}>
        Min Price
      </label>
      <NumericFormat
        prefix={'$'}
        thousandSeparator=','
        allowNegative={false}
        decimalScale={0}
        value={normalizePrice(priceRange.pricemin)}
        onValueChange={(v) => onChange?.({ pricemin: v.floatValue })}
        placeholder='Min'
        className={formStyles.input}
        id='pricemin'
        autoComplete='off'
        onFocus={onFocus}
        onBlur={onBlur}
        inputMode='numeric'
      />
      <InputRangeSeparator />
      <label htmlFor='pricemax' className={formStyles.accessibleLabel}>
        Max Price
      </label>
      <NumericFormat
        prefix={'$'}
        thousandSeparator=','
        allowNegative={false}
        decimalScale={0}
        value={normalizePrice(priceRange.pricemax)}
        onValueChange={(v) => onChange?.({ pricemax: v.floatValue })}
        placeholder='Max'
        className={formStyles.input}
        id='pricemax'
        autoComplete='off'
        onFocus={onFocus}
        onBlur={onBlur}
        inputMode='numeric'
      />
    </fieldset>
  )
}

export default Price
