import type { NextPage } from 'next'
import styles from './OutlinedButton.module.css'

const OutlinedButton: NextPage<{ highlighted: boolean }> = (props) => {
  return (
    <button
      className={props.highlighted ? styles.outlinedButtonHighlighted : styles.outlinedButton}
    >
      {props.children}
    </button>
  )
}

export default OutlinedButton
