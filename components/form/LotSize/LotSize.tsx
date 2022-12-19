import type { NextPage } from 'next'
import type { LotSizeParams } from '../../../lib/listing_service_params_types'
import { LotSizeValues } from '../../../lib/constants/filter_constants'
import styles from './LotSize.module.css'
import Fieldset from '../Fieldset/Fieldset'
import Legend from '../Legend/Legend'

export interface LotSizeProps {
  lotSizeMin: number | null
  onChange?: (lotSizeMin: LotSizeParams) => void
}

const LotSize: NextPage<LotSizeProps> = ({ lotSizeMin, onChange }) => {
  return (
    <Fieldset>
      <Legend>Lot Size</Legend>
      <select
        className={styles.lotSizeDropdown}
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
