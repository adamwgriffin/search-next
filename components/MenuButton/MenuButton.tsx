import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useClickAway } from 'react-use'
import type { NextPage } from 'next'
import styles from './MenuButton.module.css'
import OutlinedButton from '../OutlinedButton/OutlinedButton'
import MenuOpenIcon from '../icons/MenuOpenIcon/MenuOpenIcon'

interface MenuButtonProps {
  label: string
  children: ReactNode
}

const MenuButton: NextPage<MenuButtonProps> = (props) => {
  const ref = useRef(null)
  const [open, setOpen] = useState(false)
  useClickAway(ref, () => setOpen(false))

  return (
    <div
      ref={ref}
      className={styles.menuButton}
    >
      <OutlinedButton highlighted={open} onClick={() => setOpen(!open)}>
        <span className={styles.label}>
          {props.label}
        </span>
        <MenuOpenIcon open={open} />
      </OutlinedButton>
      <div className={open ? styles.open : styles.closed}>
        {props.children}
      </div>
    </div>
  )
}

export default MenuButton
