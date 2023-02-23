import type { NextPage } from 'next'
import type { ReactNode } from 'react'
import css from 'styled-jsx/css'
import MenuButton from '../../design_system/MenuButton/MenuButton'

export interface PriceMenuButtonProps {
  children: ReactNode
  onClose?: () => void
}

const PriceMenuButton: NextPage<PriceMenuButtonProps> = ({
  children,
  onClose
}) => {
  return (
    <>
      <MenuButton label='Price' className={className} onClose={onClose}>
        {children}
      </MenuButton>
      {styles}
    </>
  )
}

const { className, styles } = css.resolve`
  .menu {
    right: auto;
  }

  @media only screen and (min-width: 992px) {
    .menu {
      right: 0;
    }
  }
`

export default PriceMenuButton
