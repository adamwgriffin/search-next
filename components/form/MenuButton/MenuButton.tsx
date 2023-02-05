import type { NextPage } from 'next'
import type { ReactNode } from 'react'
import { useToggle } from 'react-use'
import css from 'styled-jsx/css'
import MenuContainter from '../MenuContainter/MenuContainter'
import MenuDropdown from '../MenuDropdown/MenuDropdown'
import OutlinedButton from '../OutlinedButton/OutlinedButton'
import MenuOpenIcon from '../../icons/MenuOpenIcon/MenuOpenIcon'

interface MenuButtonProps {
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

const MenuButton: NextPage<MenuButtonProps> = ({
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
      <OutlinedButton
        highlighted={highlighted || open}
        onClick={toggleMenu}
        condensed={condensed}
      >
        <span className='label'>{label}</span>
        <MenuOpenIcon open={open} />
      </OutlinedButton>
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
      <style jsx>{styles}</style>
    </MenuContainter>
  )
}

const styles = css`
  .label {
    margin-right: 0.5rem;
  }
`

export default MenuButton
