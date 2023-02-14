import type { NextPage } from 'next'
import type { ChangeEvent } from 'react'
import type { OpenHouseParam } from '../../../lib/types/listing_service_params_types'
import { OpenHouseScheduleIDEnum } from '../../../lib/listing_service_params'
import formStyles from '../../../styles/forms.module.css'
import Fieldset from '../../design_system/Fieldset/Fieldset'

interface OpenHouseProps {
  openHouseParam: OpenHouseParam
  onChange?: (params: OpenHouseParam) => void
}

const OpenHouse: NextPage<OpenHouseProps> = ({ openHouseParam, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const openhouse = e.target.checked
      ? OpenHouseScheduleIDEnum.todayThroughSunday
      : null
    onChange?.({ openhouse })
  }
  return (
    <Fieldset>
      <input
        type='checkbox'
        name='openhouse'
        id='openhouse'
        className={formStyles.checkbox}
        checked={!!openHouseParam.openhouse}
        onChange={handleChange}
      />
      <label className={formStyles.inputListLabel}>Open Houses</label>
    </Fieldset>
  )
}

export default OpenHouse
