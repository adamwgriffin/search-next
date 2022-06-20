import type { NextPage } from 'next'
import styles from './InputFromToSeparator.module.css'

const InputFromToSeparator: NextPage = () => {
  return (
    <span role="presentation" className={styles.inputFromToSeparator}>—</span>
  )
}

export default InputFromToSeparator
