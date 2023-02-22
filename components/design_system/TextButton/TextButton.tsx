import type { NextPage } from 'next'
import type { ReactNode } from 'react'
import styles from './TextButton.module.css'

export interface TextButtonProps {
  children: ReactNode
  onClick?: () => void
}

const TextButton: NextPage<TextButtonProps> = ({ children, onClick }) => {
  return (
    <button className={styles.textButton} onClick={onClick}>
      {children}
    </button>
  )
}

export default TextButton
