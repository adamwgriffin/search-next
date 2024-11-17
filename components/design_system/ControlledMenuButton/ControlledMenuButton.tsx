import type { ReactNode } from 'react'
import MenuContainter from '../MenuContainter/MenuContainter'
import MenuDropdown from '../MenuDropdown/MenuDropdown'
import ToggleOpenButton from '../ToggleOpenButton/ToggleOpenButton'

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
      <ToggleOpenButton
        open={open}
        label={label}
        highlighted={highlighted}
        onClick={onClick}
        condensed={condensed}
      />
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
