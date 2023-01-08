import type { NextPage } from 'next'
import { useToggle } from 'react-use'
import styles from './Login.module.css'
import MenuContainter from '../../form/MenuContainter/MenuContainter'
import MenuDropdown from '../../form/MenuDropdown/MenuDropdown'
import HamburgerIcon from '../../icons/HamburgerIcon/HamburgerIcon'
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
