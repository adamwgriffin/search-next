import type { NextPage } from 'next'
import type { MouseEventHandler, ReactNode } from 'react'
import styles from './OutlinedButton.module.css'

interface OutlinedButtonProps {
  highlighted?: boolean
  textColor?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
}

const OutlinedButton: NextPage<OutlinedButtonProps> = ({
  highlighted = false,
  textColor = '',
  onClick,
  children
}) => {
  return (
    <button
      className={
        highlighted ? styles.outlinedButtonHighlighted : styles.outlinedButton
      }
      onClick={onClick}
      style={{ color: textColor }}
    >
      {children}
    </button>
  )
}

export default OutlinedButton
