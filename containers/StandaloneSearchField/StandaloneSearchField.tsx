'use client'

import { useAppSelector } from '../../hooks/app_hooks'
import { selectSearchState } from '../../store/filters/filtersSelectors'
import { useSearchWithFilterState } from '../../hooks/search_with_filter_state_hook'
import SearchFieldContainer from '../SearchFieldContainer/SearchFieldContainer'

const StandaloneSearchField: React.FC = () => {
  const searchState = useAppSelector(selectSearchState)
  const searchWithFilterState = useSearchWithFilterState()

  // For onOptionSelected, the locationSearchField doesn't get updated in searchState by the time we execute this
  // function, so we only get the partial text that was typed in the field instead of the entire text that was selected
  // in the autocomplete. We're adding the autocompletePrediction.description here to make sure the search is correct.
  return (
    <SearchFieldContainer
      onSearchInitiated={() => searchWithFilterState(searchState)}
      onOptionSelected={(autocompletePrediction) =>
        searchWithFilterState({
          ...searchState,
          locationSearchField: autocompletePrediction.description
        })
      }
    />
  )
}

export default StandaloneSearchField
