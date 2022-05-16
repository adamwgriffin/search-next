import { Fragment } from 'react'
import type { NextPage } from 'next'
import type { CountOption } from '../../../lib/types'
import styles from './RadioButtonGroup.module.css'

const RadioButtonGroup: NextPage<{ name: string, options: CountOption[] }> = ({ name, options }) => {

  const radioCountButton = (option: CountOption) => {
    return (
      <Fragment key={`${name}-radio-${option.value}`}>
        <input
          type="radio"
          name={name}
          id={`${name}_${option.value}`}
          className={styles.radioButtonGroupInput}
        />
        <label
          htmlFor={`${name}_${option.value}`}
          className={styles.radioButtonGroupLabel}
        >
          {option.label}
        </label>
      </Fragment>
    )
  }

  return (
    <div className={styles.radioButtonGroup}>
      {options.map(o => radioCountButton(o))}
    </div>
  )
}

export default RadioButtonGroup
