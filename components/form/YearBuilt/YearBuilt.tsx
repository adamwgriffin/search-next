import type { NextPage } from 'next'
import type { YearBuiltRangeParams } from '../../../lib/listing_service_params_types'
import { useRef } from 'react'
import styles from './YearBuilt.module.css'
import formStyles from '../../../styles/forms.module.css'
import Fieldset from '../Fieldset/Fieldset'
import Legend from '../Legend/Legend'
import InputFromToSeparator from '../InputFromToSeparator/InputFromToSeparator'

export interface YearBuiltProps {
  yearBuiltRange: YearBuiltRangeParams
  onBlur?: (yearBuiltRange: YearBuiltRangeParams) => void
  onChange?: (yearBuiltRange: YearBuiltRangeParams) => void
}

const YearBuilt: NextPage<YearBuiltProps> = ({ yearBuiltRange, onBlur, onChange }) => {
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
  
  const handleBlur = () => {    
    onBlur?.(getYearBuiltRange())
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
          onBlur={handleBlur}
        />
        <InputFromToSeparator />
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
          onBlur={handleBlur}
        />
      </div>
    </Fieldset>
  )
}

export default YearBuilt
