import type { NextPage } from 'next'
import type { ChangeEvent } from 'react'
import formStyles from '../../../styles/forms.module.css'
import Fieldset from '../../design_system/Fieldset/Fieldset'

interface OpenHouseProps {
  checked: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const OpenHouse: NextPage<OpenHouseProps> = ({ checked, onChange }) => {

  return (
    <Fieldset>
      <input
        type='checkbox'
        name='openhouse'
        id='openhouse'
        className={formStyles.checkbox}
        checked={checked}
        onChange={onChange}
      />
      <label className={formStyles.inputListLabel}>Open Houses</label>
    </Fieldset>
  )
}

export default OpenHouse
