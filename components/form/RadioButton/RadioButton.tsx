import type { NextPage } from 'next'
import { useId } from 'react'
import type { CountOption } from '../../../lib/types'
import styles from './RadioButton.module.css'

export interface RadioButtonProps extends CountOption {
  name: string
}

const RadioButton: NextPage<RadioButtonProps> = ({ name, label, value, checked }) => {
  const id = useId()
  return (
    <div className={styles.radioButton}>
      <input
        type="radio"
        name={name}
        id={`${name}_${value}_${id}`}
        className={styles.radioButtonInput}
        defaultChecked={checked}
      />
      <label
        htmlFor={`${name}_${value}_${id}`}
        className={styles.radioButtonLabel}
      >
        {label}
      </label>
    </div>
  )
}

export default RadioButton
