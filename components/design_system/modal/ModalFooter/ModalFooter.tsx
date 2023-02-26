import type { NextPage } from 'next'
import type { ReactNode } from 'react'
import styles from './ModalFooter.module.css'

export interface ModalFooterProps {
  children: ReactNode
}

const ModalFooter: NextPage<ModalFooterProps> = ({
  children
}) => {
  return (
    <footer className={styles.footer}>
      {children}
    </footer>
  )
}

export default ModalFooter
