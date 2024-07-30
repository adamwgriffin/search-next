import type { NextPage } from 'next'
import { useAppSelector } from '../../hooks/app_hooks'
import { useSearchWithFilterState } from '../../hooks/search_with_filter_state_hook'
import { selectSearchState } from '../../store/filters/filtersSelectors'
import styles from './ListingDetailHeader.module.css'
import Logo from '../../components/header/Logo/Logo'
import SearchFieldContainer from '../SearchFieldContainer/SearchFieldContainer'
import UserMenu from '../UserMenu/UserMenu'

const ListingDetailHeader: NextPage = () => {
  const searchWithFilterState = useSearchWithFilterState()
  const searchState = useAppSelector(selectSearchState)

  // For onOptionSelected, the locationSearchField doesn't get updated in searchState by the time we execute this
  // function, so we only get the partial text that was typed in the field instead of the entire text that was selected
  // in the autocomplete. we're adding the autocompletePrediction.description here to make sure the search is correct.
  return (
    <header className={styles.header}>
      <Logo />
      <SearchFieldContainer
        onSearchInitiated={() => searchWithFilterState(searchState)}
        onOptionSelected={(autocompletePrediction) =>
          searchWithFilterState({
            ...searchState,
            locationSearchField: autocompletePrediction.description
          })
        }
      />
      <UserMenu />
    </header>
  )
}

export default ListingDetailHeader
