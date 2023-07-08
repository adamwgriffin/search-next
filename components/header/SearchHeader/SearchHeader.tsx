import type { NextPage } from 'next'
import styles from './SearchHeader.module.css'
import Logo from '../Logo/Logo'
import SearchFieldContainer from '../../../containers/SearchFieldContainer/SearchFieldContainer'
import Filters from '../../../containers/Filters/Filters'
import Login from '../Login/Login'

const SearchHeader: NextPage = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <SearchFieldContainer/>
      <div className={styles.controls}>
        <Login />
      </div>
      <div className={styles.filters}>
        <Filters />
      </div>
    </header>
  )
}

export default SearchHeader
