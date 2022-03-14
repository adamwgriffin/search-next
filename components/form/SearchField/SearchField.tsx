import type { NextPage } from 'next'
import SearchButton from '../SearchButton/SearchButton'
import styles from './SearchField.module.css'

const SearchField: NextPage = () => {
  return (
    <div
      className={styles.comboboxWrapper}
    >
      <div className={styles.searchFieldElements}>
        <div
          className={styles.comboboxInput}
          role="combobox"
          aria-haspopup="listbox"
        >
          <input
            className={styles.locationSearchField}
            name="location-search-field"
            aria-label="Location Search"
            aria-autocomplete="list"
            type="text"
            placeholder="Search for City, Neighborhood, Zip, County"
          />
        </div>
        <SearchButton />
      </div>
      <ul className={styles.listboxMenu} role="listbox" tabIndex={-1}>
        <li
          role="option"
          className={styles.listItem}
        >
        </li>
      </ul>
    </div>
  )
}

export default SearchField
