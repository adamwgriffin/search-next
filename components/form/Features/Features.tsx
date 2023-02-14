import type { NextPage } from 'next'
import type { FeaturesParams } from '../../../lib/types/listing_service_params_types'
import type { ChangeEvent } from 'react'
import styles from './Features.module.css'
import formStyles from '../../../styles/forms.module.css'
import { FeatureLabels } from '../../../lib/filter'
import Fieldset from '../../design_system/Fieldset/Fieldset'
import Legend from '../../design_system/Legend/Legend'

export interface FeaturesProps {
  featureParams: FeaturesParams
  onChange?: (param: Partial<FeaturesParams>) => void
}

const Features: NextPage<FeaturesProps> = ({ featureParams, onChange }) => {
  // we're using  checked || null  here because setting the param to false will exclude listings that have that feature
  // but we want to always include them.
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.({ [e.target.name]: e.target.checked || null })
  }

  return (
    <Fieldset>
      <Legend>Home Features</Legend>
      <ul className={styles.featureList}>
        {Object.entries(featureParams).map(([name, value]) => (
          <li key={name}>
            <input
              type='checkbox'
              id={name}
              className={formStyles.checkbox}
              name={name}
              checked={!!value}
              onChange={handleChange}
            />
            <label htmlFor={name} className={formStyles.inputListLabel}>
              {FeatureLabels[name as keyof typeof FeatureLabels]}
            </label>
          </li>
        ))}
      </ul>
    </Fieldset>
  )
}

export default Features
