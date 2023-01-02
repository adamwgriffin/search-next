import type { NextPage } from 'next'
import type { ReactNode } from 'react'
import { useUpdateEffect } from 'react-use'
import styles from './MenuDropdown.module.css'

interface MenuDropdownProps {
  open: boolean
  alignRight?: boolean
  alignBottom?: boolean
  children: ReactNode
  onOpen?: () => void
  onClose?: () => void
}

const MenuDropdown: NextPage<MenuDropdownProps> = ({
  open = false,
  alignRight = false,
  alignBottom = false,
  children,
  onOpen,
  onClose
}) => {
  useUpdateEffect(() => {
    open ? onOpen?.() : onClose?.()
  }, [open])

  return (
    <div
      className={open ? styles.open : styles.closed}
      style={{
        right: alignRight ? '0' : 'auto',
        bottom: alignBottom ? '100%' : 'auto'
      }}
    >
      {children}
    </div>
  )
}

export default MenuDropdown
