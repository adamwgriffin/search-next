import type { NextPage } from 'next'
import type { YearBuiltRangeParams } from '../../../lib/types/listing_service_params_types'
import { useRef } from 'react'
import styles from './YearBuilt.module.css'
import formStyles from '../../../styles/forms.module.css'
import Fieldset from '../../design_system/Fieldset/Fieldset'
import Legend from '../../design_system/Legend/Legend'
import InputRangeSeparator from '../../design_system/InputRangeSeparator/InputRangeSeparator'

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
      year_built_min: Number(yearBuiltMinRef.current?.value) || null,
      year_built_max: Number(yearBuiltMaxRef.current?.value) || null
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
          htmlFor="year_built_min"
          className={formStyles.accessibleLabel}
        >
          Min Year Built
        </label>
        <input
          ref={yearBuiltMinRef}
          type="text"
          placeholder='Min Year'
          className={formStyles.input}
          id="year_built_min"
          autoComplete='off'
          value={yearBuiltRange.year_built_min || ''}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <InputRangeSeparator />
        <label
          htmlFor="year_built_max"
          className={formStyles.accessibleLabel}
        >
          Max Year Built
        </label>
        <input
          ref={yearBuiltMaxRef}
          type="text"
          placeholder='Max Year'
          className={formStyles.input}
          id="year_built_max"
          autoComplete='off'
          value={yearBuiltRange.year_built_max || ''}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
    </Fieldset>
  )
}

export default YearBuilt
