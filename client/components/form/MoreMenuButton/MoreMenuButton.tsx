import type { NextPage } from 'next'
import type { ReactNode } from 'react'
import css from 'styled-jsx/css'
import MenuButton from '../../design_system/MenuButton/MenuButton'

export interface MoreMenuButtonProps {
  children: ReactNode
  onClose?: () => void
}

const MoreMenuButton: NextPage<MoreMenuButtonProps> = ({
  children,
  onClose
}) => {
  return (
    <>
      <MenuButton label='More' className={className} onClose={onClose}>
        {children}
      </MenuButton>
      {styles}
    </>
  )
}

const { className, styles } = css.resolve`
  .menu {
    left: auto;
    right: auto;
  }

  /* smallAndUp */
  @media only screen and (min-width: 576px) {
    .menu {
      left: 50%;
      right: auto;
      transform: translateX(-50%);
      padding: 1rem;
      overflow-y: auto;
      width: 28rem;
      max-height: 80vh;
    }
  }

  /* largeAndUp */
  @media only screen and (min-width: 992px) {
    .menu {
      left: auto;
      right: 0;
      transform: none;
    }
  }
`

export default MoreMenuButton
