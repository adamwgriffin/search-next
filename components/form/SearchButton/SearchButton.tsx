import type { NextPage } from 'next'
import noop from 'lodash/noop'
import SearchButtonIcon from '../../icons/SearchButtonIcon'
import styles from './SearchButton.module.css'

export interface SearchButtonProps {
  onClick?: () => void
}

const SearchButton: NextPage<SearchButtonProps> = ({ onClick = noop }) => {
  return (
    <button
      className={styles.searchButton}
      type="submit"
      form="search-form"
      value="Submit"
      tabIndex={0}
      title="Execute search"
      aria-label="Execute search"
      onClick={onClick}
    >
      <SearchButtonIcon />
    </button>
  )
}

export default SearchButton
