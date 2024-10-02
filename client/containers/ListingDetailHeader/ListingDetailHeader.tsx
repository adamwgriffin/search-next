import type { NextPage } from 'next'
import styles from './ListingDetailHeader.module.css'
import Logo from '../../components/header/Logo/Logo'
import StandaloneSearchField from '../StandaloneSearchField/StandaloneSearchField'
import UserMenu from '../UserMenu/UserMenu'

const ListingDetailHeader: NextPage = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <StandaloneSearchField />
      <UserMenu />
    </header>
  )
}

export default ListingDetailHeader
