import type { NextPage } from 'next'
import styles from './Legend.module.css'

const Legend: NextPage = ({ children }) => {
  return (
    <legend className={styles.legend}>
      {children}
    </legend>
  )
}

export default Legend
