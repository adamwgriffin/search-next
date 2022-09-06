import type { NextPage } from 'next'
import type { MouseEventHandler, ReactNode } from 'react'
import styles from './ContainedButton.module.css'

export interface ContainedButtonProps {
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const ContainedButton: NextPage<ContainedButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className={styles.containedButton}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default ContainedButton
