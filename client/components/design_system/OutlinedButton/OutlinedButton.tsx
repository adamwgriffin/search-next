import type { NextPage } from 'next'
import type { MouseEventHandler, ReactNode } from 'react'
import styles from './OutlinedButton.module.css'

interface OutlinedButtonProps {
  highlighted?: boolean
  condensed?: boolean
  textColor?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
}

const OutlinedButton: NextPage<OutlinedButtonProps> = ({
  highlighted = false,
  condensed = false,
  textColor = 'inherit',
  onClick,
  children
}) => {
  const buttonStyle = {
    color: textColor,
    height: condensed ? '30.5938px' : '40px',
    padding: condensed ? '0 .6rem' : '0 .8rem'
  }
  return (
    <button
      className={
        highlighted ? styles.outlinedButtonHighlighted : styles.outlinedButton
      }
      style={buttonStyle}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default OutlinedButton
