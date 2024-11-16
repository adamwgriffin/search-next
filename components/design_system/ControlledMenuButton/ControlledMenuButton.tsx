import type { ReactNode } from 'react'
import MenuContainter from '../MenuContainter/MenuContainter'
import MenuDropdown from '../MenuDropdown/MenuDropdown'
import OutlinedButton from '../OutlinedButton/OutlinedButton'
import MenuOpenIcon from '../icons/MenuOpenIcon/MenuOpenIcon'
import styles from './ControlledMenuButton.module.css'

export type ControlledMenuButtonProps = {
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

/**
 * A controlled version of <MenuButton>
 */
const ControlledMenuButton: React.FC<ControlledMenuButtonProps> = ({
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

export default ControlledMenuButton
