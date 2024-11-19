import { type ReactNode, useState } from 'react'
import css from 'styled-jsx/css'
import MenuButton from '../../design_system/MenuButton/MenuButton'

export type PriceMenuButtonProps = {
  children: ReactNode
}

const PriceMenuButton: React.FC<PriceMenuButtonProps> = ({ children }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <MenuButton
        label='Price'
        open={open}
        className={className}
        onClick={() => setOpen(!open)}
        onClickAway={() => setOpen(false)}
      >
        {children}
      </MenuButton>
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
