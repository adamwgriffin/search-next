import type { NextPage } from 'next'
import type { MouseEventHandler, ReactNode } from 'react'
import styles from './ContainedButton.module.css'

export interface ContainedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  textColor?: string
  backgroundColor?: string
}

const ContainedButton: NextPage<ContainedButtonProps> = ({
  children,
  textColor,
  backgroundColor,
  ...props
}) => {
  return (
    <button
      className={styles.containedButton}
      style={{ color: textColor, backgroundColor: backgroundColor }}
      {...props}
    >
      {children}
    </button>
  )
}

export default ContainedButton
