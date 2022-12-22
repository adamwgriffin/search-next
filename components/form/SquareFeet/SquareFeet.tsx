import type { NextPage } from 'next'
import type { SquareFeetRangeParams } from '../../../lib/listing_service_params_types'
import styles from './SquareFeet.module.css'
import formStyles from '../../../styles/forms.module.css'
import { NumericFormat } from 'react-number-format'
import Fieldset from '../Fieldset/Fieldset'
import Legend from '../Legend/Legend'
import InputFromToSeparator from '../InputFromToSeparator/InputFromToSeparator'

export interface SquareFeetProps {
  squareFeetRange: SquareFeetRangeParams
  onChange?: (squareFeetRange: Partial<SquareFeetRangeParams>) => void
  onBlur?: () => void
}

const SquareFeet: NextPage<SquareFeetProps> = ({ squareFeetRange, onChange, onBlur }) => {
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
          onBlur={onBlur}
          inputMode='numeric'
        />
        <InputFromToSeparator />
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
          onBlur={onBlur}
          inputMode='numeric'
        />
      </div>
    </Fieldset>
  )
}

export default SquareFeet
