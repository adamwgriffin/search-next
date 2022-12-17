import type { NextPage } from 'next'
import type { SquareFeetRangeParams } from '../../../lib/listing_service_params_types'
import { useRef } from 'react'
import styles from './SquareFeet.module.css'
import formStyles from '../../../styles/forms.module.css'
import Fieldset from '../Fieldset/Fieldset'
import Legend from '../Legend/Legend'
import InputFromToSeparator from '../InputFromToSeparator/InputFromToSeparator'

export interface SquareFeetProps {
  squareFeetRange: SquareFeetRangeParams
  onBlur?: (squareFeetRange: SquareFeetRangeParams) => void
  onChange?: (squareFeetRange: SquareFeetRangeParams) => void
}

const SquareFeet: NextPage<SquareFeetProps> = ({ squareFeetRange, onBlur, onChange }) => {
  const sqftMinRef = useRef<HTMLInputElement>(null)
  const sqftMaxRef = useRef<HTMLInputElement>(null)

  const getSquareFeetRange = () => {
    return {
      sqft_min: Number(sqftMinRef.current?.value) || null,
      sqft_max: Number(sqftMaxRef.current?.value) || null
    }
  }

  const handleChange = () => {    
    onChange?.(getSquareFeetRange())
  }
  
  const handleBlur = () => {    
    onBlur?.(getSquareFeetRange())
  }

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
        <input
          ref={sqftMinRef}
          type="text"
          placeholder='Min'
          className={formStyles.input}
          id="sqft_min"
          autoComplete='off'
          value={squareFeetRange.sqft_min || ''}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <InputFromToSeparator />
        <label
          htmlFor="sqft_max"
          className={formStyles.accessibleLabel}
        >
          Max Square Feet
        </label>
        <input
          ref={sqftMaxRef}
          type="text"
          placeholder='Max'
          className={formStyles.input}
          id="sqft_max"
          autoComplete='off'
          value={squareFeetRange.sqft_max || ''}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    </Fieldset>
  )
}

export default SquareFeet
