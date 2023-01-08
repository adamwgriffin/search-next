import type { NextPage } from 'next'
import type { PriceRangeParams } from '../../../lib/listing_service_params_types'
import styles from './Price.module.css'
import formStyles from '../../../styles/forms.module.css'
import { NumericFormat } from 'react-number-format'
import MenuButton from '../MenuButton/MenuButton'
import InputRangeSeparator from '../InputRangeSeparator/InputRangeSeparator'

export interface PriceProps {
  priceRange: PriceRangeParams
  onBlur?: () => void
  onClose?: () => void
  onChange?: (priceRange: Partial<PriceRangeParams>) => void
}

const Price: NextPage<PriceProps> = ({
  priceRange,
  onBlur,
  onClose,
  onChange
}) => {
  return (
    <MenuButton label='Price' alignRight onClose={() => onClose?.()}>
      <div className={styles.price}>
        <label htmlFor='pricemin' className={formStyles.accessibleLabel}>
          Min Price
        </label>
        <NumericFormat
          prefix={'$'}
          thousandSeparator=','
          allowNegative={false}
          decimalScale={0}
          value={priceRange.pricemin}
          onValueChange={(v) => onChange?.({ pricemin: v.floatValue })}
          placeholder='Min'
          className={formStyles.input}
          id='pricemin'
          autoComplete='off'
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
          value={priceRange.pricemax}
          onValueChange={(v) => onChange?.({ pricemax: v.floatValue })}
          placeholder='Max'
          className={formStyles.input}
          id='pricemax'
          autoComplete='off'
          onBlur={onBlur}
          inputMode='numeric'
        />
      </div>
    </MenuButton>
  )
}

export default Price
