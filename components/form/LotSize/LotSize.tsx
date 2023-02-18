import type { NextPage } from 'next'
import type { LotSizeParams } from '../../../lib/types/listing_service_params_types'
import { LotSizeValues } from '../../../lib/filter'
import styles from './LotSize.module.css'
import formStyles from '../../../styles/forms.module.css'
import Fieldset from '../../design_system/Fieldset/Fieldset'
import Legend from '../../design_system/Legend/Legend'

export interface LotSizeProps {
  lotSizeMin: number | null
  onChange?: (lotSizeMin: LotSizeParams) => void
}

const LotSize: NextPage<LotSizeProps> = ({ lotSizeMin, onChange }) => {
  return (
    <Fieldset>
      <Legend>Lot Size</Legend>
      <select
        className={formStyles.select}
        value={Number(lotSizeMin)}
        onChange={(e) => onChange?.({ lotsize_min: +e.target.value })}
      >
        {LotSizeValues.map(({ label, value }) => (
          <option key={value.toString()} value={value}>
            {label}
          </option>
        ))}
      </select>
    </Fieldset>
  )
}

export default LotSize
