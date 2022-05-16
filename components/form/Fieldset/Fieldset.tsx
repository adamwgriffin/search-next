import type { NextPage } from 'next'
import styles from './Fieldset.module.css'

const Fieldset: NextPage = ({ children }) => {
  return (
    <fieldset className={styles.fieldset}>
      {children}
    </fieldset>
  )
}

export default Fieldset
