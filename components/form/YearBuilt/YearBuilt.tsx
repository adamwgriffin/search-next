import type { NextPage } from 'next'
import type { YearBuiltRangeParams } from '../../../lib/listing_service_params_types'
import { useRef } from 'react'
import styles from './YearBuilt.module.css'
import formStyles from '../../../styles/forms.module.css'
import Fieldset from '../Fieldset/Fieldset'
import Legend from '../Legend/Legend'
import InputRangeSeparator from '../InputRangeSeparator/InputRangeSeparator'

export interface YearBuiltProps {
  yearBuiltRange: YearBuiltRangeParams
  onFocus?: () => void
  onBlur?: () => void
  onChange?: (yearBuiltRange: YearBuiltRangeParams) => void
}

const YearBuilt: NextPage<YearBuiltProps> = ({ yearBuiltRange, onFocus, onBlur, onChange }) => {
  const yearBuiltMinRef = useRef<HTMLInputElement>(null)
  const yearBuiltMaxRef = useRef<HTMLInputElement>(null)

  const getYearBuiltRange = (): YearBuiltRangeParams => {
    return {
      yearblt_min: Number(yearBuiltMinRef.current?.value) || null,
      yearblt_max: Number(yearBuiltMaxRef.current?.value) || null
    }
  }

  const handleChange = () => {    
    onChange?.(getYearBuiltRange())
  }

  return (
    <Fieldset>
      <Legend>Year Built</Legend>
      <div className={styles.yearBuilt}>
      <label
          htmlFor="yearblt_min"
          className={formStyles.accessibleLabel}
        >
          Min Year Built
        </label>
        <input
          ref={yearBuiltMinRef}
          type="text"
          placeholder='Min Year'
          className={formStyles.input}
          id="yearblt_min"
          autoComplete='off'
          value={yearBuiltRange.yearblt_min || ''}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <InputRangeSeparator />
        <label
          htmlFor="yearblt_max"
          className={formStyles.accessibleLabel}
        >
          Max Year Built
        </label>
        <input
          ref={yearBuiltMaxRef}
          type="text"
          placeholder='Max Year'
          className={formStyles.input}
          id="yearblt_max"
          autoComplete='off'
          value={yearBuiltRange.yearblt_max || ''}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
    </Fieldset>
  )
}

export default YearBuilt
