import type { NextPage } from 'next'
import { useGoogleMaps } from '../../context/google_maps_context'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { searchNewLocation } from '../../store/listingSearch/listingSearchSlice'
import { setFilters } from '../../store/filters/filtersSlice'
import { selectLocationSearchField } from '../../store/filters/filtersSelectors'
import {
  getPlaceAutocompletePredictions,
  resetAutcompletePlacePredictions,
  selectAutcompletePlacePredictions
} from '../../store/autocomplete/autocompleteSlice'
import SearchField from '../../components/form/SearchField/SearchField'

// a container that simply wraps SearchField and connects it to the redux store
const SearchFieldContainer: NextPage = () => {
  const dispatch = useAppDispatch()
  const locationSearchField = useAppSelector(selectLocationSearchField)
  const options = useAppSelector(selectAutcompletePlacePredictions)
  const { googleLoaded, googleMap } = useGoogleMaps()

  const handleOnGetPlaceAutocompletePredictions = (val: string) => {
    googleLoaded && dispatch(getPlaceAutocompletePredictions(val))
  }

  const handleOnClearPlaceAutocompletePredictions = () => {
    dispatch(resetAutcompletePlacePredictions())
  }

  const handleOnSearchInitiated = () => {
    if (googleLoaded) {
      dispatch(searchNewLocation())
    } else {
      console.warn("Google library isn't loaded yet")
    }
  }

  const handleOnOptionSelected = (
    autocompletePrediction: google.maps.places.AutocompletePrediction
  ) => {
    dispatch(
      setFilters({ locationSearchField: autocompletePrediction.description })
    )
    if (googleLoaded && googleMap) {
      dispatch(searchNewLocation())
    } else {
      console.warn('The googleMap instance is not available')
    }
  }

  const handleOnInput = (details: string) =>
    dispatch(setFilters({ locationSearchField: details }))

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
      onSearchInitiated={handleOnSearchInitiated}
      onOptionSelected={handleOnOptionSelected}
    />
  )
}

export default SearchFieldContainer
