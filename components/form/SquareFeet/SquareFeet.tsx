import type { NextPage } from 'next'
import type { SquareFeetRangeParams } from '../../../lib/types/listing_service_params_types'
import styles from './SquareFeet.module.css'
import formStyles from '../../../styles/forms.module.css'
import { NumericFormat } from 'react-number-format'
import Fieldset from '../../design_system/Fieldset/Fieldset'
import Legend from '../../design_system/Legend/Legend'
import InputRangeSeparator from '../../design_system/InputRangeSeparator/InputRangeSeparator'

export interface SquareFeetProps {
  squareFeetRange: SquareFeetRangeParams
  onChange?: (squareFeetRange: Partial<SquareFeetRangeParams>) => void
  onFocus?: () => void
  onBlur?: () => void
}

const SquareFeet: NextPage<SquareFeetProps> = ({ squareFeetRange, onChange, onFocus, onBlur }) => {
  return (
    <Fieldset>
      <Legend>Square Feet</Legend>
      <div className={styles.squareFeet}>
        <label
          htmlFor="sqft_min"
          className={formStyles.accessibleLabel}
        >
          Min Square Feet
        </label>
        <NumericFormat
          thousandSeparator=','
          allowNegative={false}
          decimalScale={0}
          value={squareFeetRange.sqft_min}
          onValueChange={(v) => onChange?.({ sqft_min: v.floatValue })}
          placeholder='Min'
          className={formStyles.input}
          id='sqft_min'
          autoComplete='off'
          onFocus={onFocus}
          onBlur={onBlur}
          inputMode='numeric'
        />
        <InputRangeSeparator />
        <label
          htmlFor="sqft_max"
          className={formStyles.accessibleLabel}
        >
          Max Square Feet
        </label>
        <NumericFormat
          thousandSeparator=','
          allowNegative={false}
          decimalScale={0}
          value={squareFeetRange.sqft_max}
          onValueChange={(v) => onChange?.({ sqft_max: v.floatValue })}
          placeholder='Max'
          className={formStyles.input}
          id='sqft_max'
          autoComplete='off'
          onFocus={onFocus}
          onBlur={onBlur}
          inputMode='numeric'
        />
      </div>
    </Fieldset>
  )
}

export default SquareFeet
