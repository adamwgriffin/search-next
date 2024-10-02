import type { NextPage } from 'next'
import { useSearchNewLocation } from '../../hooks/search_new_location_hook'
import styles from './SearchHeader.module.css'
import Logo from '../../components/header/Logo/Logo'
import SearchFieldContainer from '../SearchFieldContainer/SearchFieldContainer'
import Filters from '../Filters/Filters'
import UserMenu from '../UserMenu/UserMenu'

const SearchHeader: NextPage = () => {
  const searchNewLocation = useSearchNewLocation()

  return (
    <header className={styles.header}>
      <Logo />
      <SearchFieldContainer
        onSearchInitiated={searchNewLocation}
        onOptionSelected={searchNewLocation}
      />
      <div className={styles.controls}>
        <UserMenu />
      </div>
      <div className={styles.filters}>
        <Filters />
      </div>
    </header>
  )
}

export default SearchHeader
