import type { NextPage } from 'next'
import SearchField from '../form/SearchField/SearchField'
import styles from './Header.module.css'

const Header: NextPage = () => {
  return (
    <header className={styles.Header}>
      <SearchField />
    </header>
  )
}

export default Header
