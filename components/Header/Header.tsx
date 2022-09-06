import type { NextPage } from 'next'
import { useGoogleMaps } from '../../context/google_maps_context'
import SearchField from '../form/SearchField/SearchField'
import styles from './Header.module.css'
import { useAppSelector, useAppDispatch } from '../../hooks'
import {
  setLocationSearchField,
  searchListings,
  selectLocationSearchField,
  selectSearchParams
} from '../../store/listingSearch/listingSearchSlice'
import {
  getPlaceAutocompletePredictions,
  resetAutcompletePlacePredictions,
  getPlaceAutocompleteDetails,
  selectAutcompletePlacePredictions
} from '../../store/places/placesSlice'

const Header: NextPage = () => {
  const dispatch = useAppDispatch()
  const value = useAppSelector(selectLocationSearchField)
  const params = useAppSelector(selectSearchParams)
  const options = useAppSelector(selectAutcompletePlacePredictions)
  const { googleLoaded, googleMap } = useGoogleMaps()  

  const handleOnGetPlaceAutocompletePredictions = async (val:string) => {
    googleLoaded && dispatch(getPlaceAutocompletePredictions(val))
  }

  const handleOnClearPlaceAutocompletePredictions = () => {
    dispatch(resetAutcompletePlacePredictions())
  }

  const handleOnSearchInitiated = () => {
    googleLoaded && dispatch(searchListings(params))
  }

  const handleOnOptionSelected = (option: google.maps.places.AutocompletePrediction) => {
    if (googleLoaded && googleMap) {
      dispatch(setLocationSearchField(option.description))
      dispatch(getPlaceAutocompleteDetails({ placeId: option.place_id, googleMap: googleMap}))
    } else {
      console.warn("The googleMap instance is not available")
    }
  }

  const handleOnInput = (details:string) => dispatch(setLocationSearchField(details))

  return (
    <header className={styles.Header}>
      <SearchField
        value={value}
        options={options}
        onInput={handleOnInput}
        onGetPlaceAutocompletePredictions={handleOnGetPlaceAutocompletePredictions}
        onClearPlaceAutocompletePredictions={handleOnClearPlaceAutocompletePredictions}
        onSearchInitiated={handleOnSearchInitiated}
        onOptionSelected={handleOnOptionSelected}
      />
    </header>
  )
}

export default Header
