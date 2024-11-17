import type { ReactNode } from 'react'
import { useToggle } from 'react-use'
import MenuContainter from '../MenuContainter/MenuContainter'
import MenuDropdown from '../MenuDropdown/MenuDropdown'
import ToggleOpenButton from '../ToggleOpenButton/ToggleOpenButton'

export type MenuButtonProps = {
  label: string
  alignRight?: boolean
  alignBottom?: boolean
  highlighted?: boolean
  condensed?: boolean
  className?: string
  children: ReactNode
  onOpen?: () => void
  onClose?: () => void
}

const MenuButton: React.FC<MenuButtonProps> = ({
  label,
  alignRight = false,
  alignBottom = false,
  highlighted = false,
  condensed = false,
  className,
  children,
  onOpen,
  onClose
}) => {
  const [open, toggleMenu] = useToggle(false)

  return (
    <MenuContainter onClickAway={() => toggleMenu(false)}>
      <ToggleOpenButton
        open={open}
        label={label}
        highlighted={highlighted}
        onClick={toggleMenu}
        condensed={condensed}
      />
      <MenuDropdown
        open={open}
        alignRight={alignRight}
        alignBottom={alignBottom}
        className={className}
        onOpen={onOpen}
        onClose={onClose}
      >
        {children}
      </MenuDropdown>
    </MenuContainter>
  )
}

export default MenuButton
