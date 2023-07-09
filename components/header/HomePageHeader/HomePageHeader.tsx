import type { NextPage } from 'next'
import styles from './HomePageHeader.module.css'
import Logo from '../Logo/Logo'
import Login from '../Login/Login'

const HomePageHeader: NextPage = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <Login />
    </header>
  )
}

export default HomePageHeader
