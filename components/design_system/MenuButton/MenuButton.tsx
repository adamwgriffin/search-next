import { type ReactNode, useId, useState } from 'react'
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
  const [open, setOpen] = useState(false)
  const uniqueID = useId()
  const menuId = `button-menu-${uniqueID}`

  return (
    <MenuContainter onClickAway={() => setOpen(false)}>
      <ToggleOpenButton
        open={open}
        label={label}
        highlighted={highlighted}
        condensed={condensed}
        role='button'
        aria-haspopup='menu'
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen(!open)}
      />
      <MenuDropdown
        id={menuId}
        className={className}
        open={open}
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
