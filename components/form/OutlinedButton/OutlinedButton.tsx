import type { NextPage } from 'next'
import type { MouseEventHandler, ReactNode } from 'react'
import styles from './OutlinedButton.module.css'

interface OutlinedButtonProps {
  highlighted: boolean
  children: ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>
}

const OutlinedButton: NextPage<OutlinedButtonProps> = (props) => {
  return (
    <button
      className={props.highlighted ? styles.outlinedButtonHighlighted : styles.outlinedButton}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default OutlinedButton
