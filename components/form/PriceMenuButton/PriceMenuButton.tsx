import { type ReactNode, useState } from 'react'
import css from 'styled-jsx/css'
import ControlledMenuButton from '../../design_system/ControlledMenuButton/ControlledMenuButton'

export type PriceMenuButtonProps = {
  children: ReactNode
}

const PriceMenuButton: React.FC<PriceMenuButtonProps> = ({ children }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <ControlledMenuButton
        label='Price'
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
    padding: 1rem;
    width: 22rem;
  }

  @media only screen and (min-width: 992px) {
    .menu {
      right: 0;
    }
  }
`

export default PriceMenuButton
