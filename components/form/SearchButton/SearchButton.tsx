import type { NextPage } from 'next'
import SearchButtonIcon from '../../icons/SearchButtonIcon'
import styles from './SearchButton.module.css'

const SearchButton: NextPage = () => {
  return (
    <button
      className={styles.searchButton}
      type="submit"
      form="search-form"
      value="Submit"
      tabIndex={0}
      title="Execute search"
      aria-label="Execute search"
    >
      <SearchButtonIcon />
    </button>
  )
}

export default SearchButton
