import type { NextPage } from 'next'
import type { ReactNode } from 'react'
import css from 'styled-jsx/css'
import MenuButton from '../../design_system/MenuButton/MenuButton'

export interface BedsAndBathsMenuButtonProps {
  children: ReactNode
  onClose?: () => void
}

const BedsAndBathsMenuButton: NextPage<BedsAndBathsMenuButtonProps> = ({
  children,
  onClose
}) => {
  return (
    <>
      <MenuButton label='Beds & Baths' className={className} onClose={onClose}>
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

  /* smallAndUp */
  @media only screen and (min-width: 576px) {
    .menu {
      min-width: 440px;
      padding: 1rem;
    }
  }

  /* largeAndUp */
  @media only screen and (min-width: 992px) {
    .menu {
      right: 0;
    }
  }
`

export default BedsAndBathsMenuButton
