import type { NextPage } from 'next'
import { useToggle } from 'react-use'
import styles from './Login.module.css'
import MenuContainter from '../../design_system/MenuContainter/MenuContainter'
import MenuDropdown from '../../design_system/MenuDropdown/MenuDropdown'
import HamburgerIcon from '../../design_system/icons/HamburgerIcon/HamburgerIcon'
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher'

const Login: NextPage = () => {
  const [open, toggleMenu] = useToggle(false)

  return (
    <MenuContainter onClickAway={() => toggleMenu(false)}>
      <button className={styles.loginButton} onClick={toggleMenu}>
        <HamburgerIcon active={open} />
      </button>
      <MenuDropdown open={open} alignRight>
        <div className={styles.loginMenu}>
          <h1 className={styles.user}>
            John Doe
          </h1>
          <ThemeSwitcher />
        </div>
      </MenuDropdown>
    </MenuContainter>
  )
}

export default Login
