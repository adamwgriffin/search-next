import type { NextPage } from 'next'
import type { MouseEventHandler, ReactNode } from 'react'
import styles from './ContainedButton.module.css'

export interface ContainedButtonProps {
  children: ReactNode
  textColor?: string
  backgroundColor?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const ContainedButton: NextPage<ContainedButtonProps> = ({
  children,
  textColor,
  backgroundColor,
  onClick
}) => {
  return (
    <button
      className={styles.containedButton}
      style={{ color: textColor, backgroundColor: backgroundColor }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default ContainedButton
