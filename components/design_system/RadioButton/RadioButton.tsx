import type { NextPage } from 'next'
import { useId, ChangeEvent } from 'react'
import type { CountOption } from '../../../lib/types'
import styles from './RadioButton.module.css'

export interface RadioButtonProps extends CountOption {
  name: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const RadioButton: NextPage<RadioButtonProps> = ({ name, label, value, checked, onChange }) => {
  const id = useId()
  const inputId = `${name}_${value}_${id}`

  return (
    <div className={styles.radioButton}>
      <input
        type="radio"
        name={name}
        id={inputId}
        className={styles.radioButtonInput}
        checked={checked}
        onChange={(e) => onChange?.(e)}
      />
      <label
        htmlFor={inputId}
        className={styles.radioButtonLabel}
      >
        {label}
      </label>
    </div>
  )
}

export default RadioButton
