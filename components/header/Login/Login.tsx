import type { NextPage } from 'next'
import styles from './Login.module.css'
import MenuButton from '../../form/MenuButton/MenuButton'
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher'

const Login: NextPage = () => {
  return (
    <MenuButton label='Login' alignRight>
      <div className={styles.login}>
        <ThemeSwitcher />
      </div>
    </MenuButton>
  )
}

export default Login
