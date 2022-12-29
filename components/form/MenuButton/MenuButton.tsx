import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useClickAway } from 'react-use'
import type { NextPage } from 'next'
import styles from './MenuButton.module.css'
import OutlinedButton from '../OutlinedButton/OutlinedButton'
import MenuOpenIcon from '../../icons/MenuOpenIcon/MenuOpenIcon'

interface MenuButtonProps {
  label: string
  children: ReactNode
  alignRight?: boolean
  onOpen?: () => void
  onClose?: () => void
}

const MenuButton: NextPage<MenuButtonProps> = ({
  label,
  children,
  alignRight,
  onOpen,
  onClose
}) => {
  const ref = useRef(null)
  const [open, setOpen] = useState(false)

  const closeMenu = () => {
    if (open) {
      setOpen(false)
      onClose?.()
    }
  }

  const toggleMenu = () => {
    const opened = !open
    setOpen(opened)
    opened ? onOpen?.() : onClose?.()
  }

  useClickAway(ref, closeMenu)

  const menuClass = open ? styles.open : styles.closed
  const menuStyle = { right: alignRight ? '0' : 'none' }

  return (
    <div ref={ref} className={styles.menuButton}>
      <OutlinedButton highlighted={open} onClick={toggleMenu}>
        <span className={styles.label}>{label}</span>
        <MenuOpenIcon open={open} />
      </OutlinedButton>
      <div className={menuClass} style={menuStyle}>
        {children}
      </div>
    </div>
  )
}

export default MenuButton
