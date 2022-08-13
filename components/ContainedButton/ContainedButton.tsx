import type { NextPage } from 'next'
import type { ReactNode } from 'react'
import styles from './ContainedButton.module.css'

const ContainedButton: NextPage<{ children: ReactNode }> = ({ children }) => {
  return (
    <button className={styles.containedButton}>
      {children}
    </button>
  )
}

export default ContainedButton
