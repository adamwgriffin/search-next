import type { NextPage } from 'next'
import type { ReactNode } from 'react'
import { useToggle } from 'react-use'
import MenuContainter from '../MenuContainter/MenuContainter'
import MenuDropdown from '../MenuDropdown/MenuDropdown'
import OutlinedButton from '../OutlinedButton/OutlinedButton'
import MenuOpenIcon from '../icons/MenuOpenIcon/MenuOpenIcon'
import styles from './MenuButton.module.css'

interface MenuButtonProps {
  label: string
  alignCenter?: boolean
  alignRight?: boolean
  alignBottom?: boolean
  highlighted?: boolean
  condensed?: boolean
  children: ReactNode
  onOpen?: () => void
  onClose?: () => void
}

const MenuButton: NextPage<MenuButtonProps> = ({
  label,
  alignCenter = false,
  alignRight = false,
  alignBottom = false,
  highlighted = false,
  condensed = false,
  children,
  onOpen,
  onClose
}) => {
  const [open, toggleMenu] = useToggle(false)

  return (
    <MenuContainter onClickAway={() => toggleMenu(false)}>
      <OutlinedButton
        highlighted={highlighted || open}
        onClick={toggleMenu}
        condensed={condensed}
      >
        <span className={styles.label}>{label}</span>
        <MenuOpenIcon open={open} />
      </OutlinedButton>
      <MenuDropdown
        open={open}
        alignCenter={alignCenter}
        alignRight={alignRight}
        alignBottom={alignBottom}
        onOpen={onOpen}
        onClose={onClose}
      >
        {children}
      </MenuDropdown>
    </MenuContainter>
  )
}

export default MenuButton
