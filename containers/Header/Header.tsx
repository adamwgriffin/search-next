import type { NextPage } from 'next'
import { useGoogleMaps } from '../../context/google_maps_context'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { searchNewLocation } from '../../store/listingSearch/listingSearchSlice'
import {
  selectLocationSearchField,
  setFilters
} from '../../store/filters/filtersSlice'
import {
  getPlaceAutocompletePredictions,
  resetAutcompletePlacePredictions,
  selectAutcompletePlacePredictions
} from '../../store/autocomplete/autocompleteSlice'
import styles from './Header.module.css'
import Logo from '../../components/header/Logo/Logo'
import SearchField from '../../components/form/SearchField/SearchField'
import Filters from '../Filters/Filters'
import Login from '../../components/header/Login/Login'

const Header: NextPage = () => {
  const dispatch = useAppDispatch()
  const locationSearchField = useAppSelector(selectLocationSearchField)
  const options = useAppSelector(selectAutcompletePlacePredictions)
  const { googleLoaded, googleMap } = useGoogleMaps()

  const handleOnGetPlaceAutocompletePredictions = async (val: string) => {
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
    <header className={styles.header}>
      <Logo />
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
      <div className={styles.controls}>
        <Login />
      </div>
      <div className={styles.filters}>
        <Filters />
      </div>
    </header>
  )
}

export default Header
