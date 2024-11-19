import { type ReactNode, useState } from 'react'
import css from 'styled-jsx/css'
import ControlledMenuButton from '../../design_system/ControlledMenuButton/ControlledMenuButton'

export type BedsAndBathsMenuButtonProps = {
  children: ReactNode
}

const BedsAndBathsMenuButton: React.FC<BedsAndBathsMenuButtonProps> = ({
  children
}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <ControlledMenuButton
        label='Beds & Baths'
        open={open}
        className={className}
        onClick={() => setOpen(!open)}
        onClickAway={() => setOpen(false)}
      >
        {children}
      </ControlledMenuButton>
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
