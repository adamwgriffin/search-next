import type { NextPage } from 'next'
import {
  SearchTypeOption,
  SearchTypes
} from '../../../store/listingSearch/listingSearchSlice'
import styles from './SearchTypeSelector.module.css'
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
    <Fieldset>
      <legend className={styles.title}>Search Type</legend>
      <div className={styles.container}>
        {Object.values(SearchTypes).map((value) => {
          return (
            <>
              <input
                key={`search-type-input-${value}`}
                type='radio'
                name={`search-type-${value}`}
                id={`search-type-${value}`}
                className={styles.input}
                checked={value === searchType}
                value={value}
                onChange={() => onChange?.(value)}
              />
              <label
                key={`search-type-label-${value}`}
                htmlFor={`search-type-${value}`}
                className={styles.label}
              >
                {SearchTypeLabels[value]}
              </label>
            </>
          )
        })}
      </div>
    </Fieldset>
  )
}

export default SearchTypeSelector
