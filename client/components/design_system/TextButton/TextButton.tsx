import type { NextPage } from 'next'
import type { ReactNode } from 'react'
import styles from './TextButton.module.css'

const TextButton: NextPage<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button className={styles.textButton} {...props}>
      {children}
    </button>
  )
}

export default TextButton
