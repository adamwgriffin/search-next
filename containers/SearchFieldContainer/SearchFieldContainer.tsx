import type { NextPage } from 'next'
import { useAppSelector, useAppDispatch } from '../../hooks/app_hooks'
import { setFilters } from '../../store/filters/filtersSlice'
import { selectLocationSearchField } from '../../store/filters/filtersSelectors'
import {
  getPlaceAutocompletePredictions,
  resetAutcompletePlacePredictions,
  selectAutcompletePlacePredictions
} from '../../store/autocomplete/autocompleteSlice'
import SearchField from '../../components/form/SearchField/SearchField'

export interface SearchFieldContainerProps {
  onSearchInitiated?: () => void
  onOptionSelected?: (option: google.maps.places.AutocompletePrediction) => void
}

// a container that simply wraps SearchField and connects it to the redux store
const SearchFieldContainer: NextPage<SearchFieldContainerProps> = ({
  onSearchInitiated,
  onOptionSelected
}) => {
  const dispatch = useAppDispatch()
  const locationSearchField = useAppSelector(selectLocationSearchField)
  const options = useAppSelector(selectAutcompletePlacePredictions)

  const handleOnInput = (details: string) =>
    dispatch(setFilters({ locationSearchField: details }))

  const handleOnGetPlaceAutocompletePredictions = (val: string) => {
    dispatch(getPlaceAutocompletePredictions(val))
  }

  const handleOnClearPlaceAutocompletePredictions = () => {
    dispatch(resetAutcompletePlacePredictions())
  }

  const handleOnOptionSelected = (
    autocompletePrediction: google.maps.places.AutocompletePrediction
  ) => {
    dispatch(
      setFilters({ locationSearchField: autocompletePrediction.description })
    )
    onOptionSelected?.(autocompletePrediction)
  }

  return (
    <SearchField
      value={locationSearchField}
      options={options}
      onInput={handleOnInput}
      onGetPlaceAutocompletePredictions={
        handleOnGetPlaceAutocompletePredictions
      }
      onClearPlaceAutocompletePredictions={
        handleOnClearPlaceAutocompletePredictions
      }
      onSearchInitiated={onSearchInitiated}
      onOptionSelected={handleOnOptionSelected}
    />
  )
}

export default SearchFieldContainer
