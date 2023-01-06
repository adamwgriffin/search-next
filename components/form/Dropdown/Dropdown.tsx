import type { NextPage } from 'next'
import type { ReactNode } from 'react'
import styles from './Dropdown.module.css'
import MenuContainter from '../MenuContainter/MenuContainter'
import MenuDropdown from '../MenuDropdown/MenuDropdown'
import OutlinedButton from '../OutlinedButton/OutlinedButton'
import MenuOpenIcon from '../../icons/MenuOpenIcon/MenuOpenIcon'

interface DropdownProps {
  open: boolean
  label: string
  alignRight?: boolean
  alignBottom?: boolean
  highlighted?: boolean
  condensed?: boolean
  children: ReactNode
  onClick?: () => void
  onClickAway?: (e: Event) => void
}

const Dropdown: NextPage<DropdownProps> = ({
  label,
  open = false,
  alignRight = false,
  alignBottom = false,
  highlighted = false,
  condensed = false,
  children,
  onClick,
  onClickAway
}) => {
  return (
    <MenuContainter onClickAway={onClickAway}>
      <OutlinedButton
        highlighted={highlighted || open}
        onClick={onClick}
        condensed={condensed}
      >
        <span className={styles.label}>{label}</span>
        <MenuOpenIcon open={open} />
      </OutlinedButton>
      <MenuDropdown
        open={open}
        alignRight={alignRight}
        alignBottom={alignBottom}
      >
        {children}
      </MenuDropdown>
    </MenuContainter>
  )
}

export default Dropdown
