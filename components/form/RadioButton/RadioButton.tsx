import uniqueId from 'lodash/uniqueId'
import type { NextPage } from 'next'
import type { CountOption } from '../../../lib/types'
import styles from './RadioButton.module.css'

export interface RadioButtonProps extends CountOption {
  name: string
}

const RadioButton: NextPage<RadioButtonProps> = ({ name, label, value, checked }) => {
  const radioButtonId = uniqueId(`${name}_${value}_`)
  return (
    <div className={styles.radioButton}>
      <input
        type="radio"
        name={name}
        id={radioButtonId}
        className={styles.radioButtonInput}
        defaultChecked={checked}
      />
      <label
        htmlFor={radioButtonId}
        className={styles.radioButtonLabel}
      >
        {label}
      </label>
    </div>
  )
}

export default RadioButton
