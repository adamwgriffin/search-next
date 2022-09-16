import type { NextPage } from 'next'
import {
  SearchTypeOption,
  SearchTypes
} from '../../../store/listingSearch/listingSearchSlice'
import styles from './SearchTypeSelector.module.css'
import MenuButton from '../MenuButton/MenuButton'
import Fieldset from '../Fieldset/Fieldset'

export interface SearchTypeProps {
  searchType: SearchTypeOption
  onChange?: (searchType: SearchTypeOption) => void
}

export const SearchTypeLabels = {
  [SearchTypes.Buy]: 'For Sale',
  [SearchTypes.Rent]: 'For Rent',
  [SearchTypes.Sold]: 'Sold'
}

const SearchTypeSelector: NextPage<SearchTypeProps> = ({
  searchType,
  onChange
}) => {
  return (
    <MenuButton label={SearchTypeLabels[searchType]}>
      <Fieldset>
        <ul className={styles.searchTypesList}>
          {Object.values(SearchTypes).map((value) => {
            return (
              <li
                key={`search-type-${value}`}
                className={styles.searchTypesListItem}
              >
                <input
                  type='radio'
                  name={`search-type-${value}`}
                  id={`search-type-${value}`}
                  className={styles.radioButtonInput}
                  checked={value === searchType}
                  value={value}
                  onChange={() => onChange?.(value)}
                />
                <label
                  htmlFor={`search-type-${value}`}
                  className={styles.searchTypesLabel}
                >
                  {SearchTypeLabels[value]}
                </label>
              </li>
            )
          })}
        </ul>
      </Fieldset>
    </MenuButton>
  )
}

export default SearchTypeSelector
