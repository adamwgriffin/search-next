import type { NextPage } from 'next'
import type { CSSProperties, ReactNode } from 'react'
import { useUpdateEffect } from 'react-use'
import css from 'styled-jsx/css'

interface MenuDropdownProps {
  open: boolean
  alignRight?: boolean
  alignBottom?: boolean
  className?: string
  children: ReactNode
  onOpen?: () => void
  onClose?: () => void
}

const MenuDropdown: NextPage<MenuDropdownProps> = ({
  open = false,
  alignRight = false,
  alignBottom = false,
  className = '',
  children,
  onOpen,
  onClose
}) => {
  useUpdateEffect(() => {
    open ? onOpen?.() : onClose?.()
  }, [open])

  const classNames = `menu ${open ? 'open' : 'closed'} ${className}`.trim()

  const computedStyles: CSSProperties = {
    right: alignRight ? '0' : undefined,
    bottom: alignBottom ? '100%' : undefined
  }

  return (
    <>
      <div className={classNames} style={computedStyles}>
        {children}
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

const styles = css`
  .menu {
    position: absolute;
    transform: none;
    z-index: 3;
    min-width: 6rem;
    border-radius: 6px;
    margin-top: 3px;
    box-shadow: 0px 9px 12px rgba(0, 0, 0, 0.06),
      0px 3px 16px rgba(0, 0, 0, 0.04), 0px 5px 6px rgba(0, 0, 0, 0.06);
    background: var(--background);
  }

  .open {
    display: block;
  }

  .closed {
    display: none;
  }
`

export default MenuDropdown
