import type { NextPage } from 'next'
import type { ChangeEvent } from 'react'
import type { ExcludeStatusParams } from '../../../lib/types/listing_service_params_types'
import type { StatusType } from '../../../lib/status_types'
import { StatusTypes } from '../../../lib/status_types'
import Fieldset from '../../design_system/Fieldset/Fieldset'
import styles from './ListingStatus.module.css'
import formStyles from '../../../styles/forms.module.css'

interface ListingStatusProps {
  statusParms: ExcludeStatusParams
  onChange?: (param: ExcludeStatusParams) => void
}

const ListingStatus: NextPage<ListingStatusProps> = ({
  statusParms,
  onChange
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.({ ...statusParms, [e.target.name]: !e.target.checked })
  }

  return (
    <Fieldset>
      <ul className={styles.listingStatusList}>
        {StatusTypes.map(({ param, id, label }: StatusType) => (
          <li key={id} className={formStyles.inputListItem}>
            <input
              type='checkbox'
              name={param}
              value={id}
              id={param}
              className={formStyles.checkbox}
              checked={!statusParms[param]}
              onChange={handleChange}
            />
            <label htmlFor={param} className={formStyles.inputListLabel}>
              {label}
            </label>
          </li>
        ))}
      </ul>
    </Fieldset>
  )
}

export default ListingStatus
