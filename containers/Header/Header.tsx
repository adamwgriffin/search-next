import type { NextPage } from 'next'
import { useGoogleMaps } from '../../context/google_maps_context'
import { useAppSelector, useAppDispatch } from '../../hooks'
import {
  setLocationSearchField,
  selectLocationSearchField,
  doGeospatialGeocodeSearch
} from '../../store/listingSearch/listingSearchSlice'
import {
  getPlaceAutocompletePredictions,
  resetAutcompletePlacePredictions,
  selectAutcompletePlacePredictions
} from '../../store/places/placesSlice'
import styles from './Header.module.css'
import Logo from '../../components/header/Logo/Logo'
import SearchField from '../../components/form/SearchField/SearchField'
import ThemeSwitcher from '../../components/header/ThemeSwitcher/ThemeSwitcher'
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
      dispatch(doGeospatialGeocodeSearch())
    } else {
      console.warn("Google library isn't loaded yet")
    }
  }

  const handleOnOptionSelected = (
    autocompletePrediction: google.maps.places.AutocompletePrediction
  ) => {
    dispatch(setLocationSearchField(autocompletePrediction.description))
    if (googleLoaded && googleMap) {
      dispatch(doGeospatialGeocodeSearch())
    } else {
      console.warn('The googleMap instance is not available')
    }
  }

  const handleOnInput = (details: string) =>
    dispatch(setLocationSearchField(details))

  return (
    <header className={styles.header}>
      <Logo width='167' height='36' />
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
        <ThemeSwitcher />
        <Login />
      </div>
    </header>
  )
}

export default Header
