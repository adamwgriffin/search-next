import type { NextPage } from 'next'
import styles from './OutlinedButton.module.css'
import { MouseEventHandler } from 'react'
import type { ReactNode } from 'react'

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
