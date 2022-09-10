import type { NextPage } from 'next'
import { useGoogleMaps } from '../../context/google_maps_context'
import SearchField from '../form/SearchField/SearchField'
import styles from './Header.module.css'
import { useAppSelector, useAppDispatch } from '../../hooks'
import {
  setLocationSearchField,
  selectLocationSearchField,
  initiateListingSearch
} from '../../store/listingSearch/listingSearchSlice'
import {
  getPlaceAutocompletePredictions,
  resetAutcompletePlacePredictions,
  selectAutcompletePlacePredictions,
} from '../../store/places/placesSlice'

const Header: NextPage = () => {
  const dispatch = useAppDispatch()
  const locationSearchField = useAppSelector(selectLocationSearchField)
  const options = useAppSelector(selectAutcompletePlacePredictions)
  const { googleLoaded, googleMap } = useGoogleMaps()  

  const handleOnGetPlaceAutocompletePredictions = async (val:string) => {
    googleLoaded && dispatch(getPlaceAutocompletePredictions(val))
  }

  const handleOnClearPlaceAutocompletePredictions = () => {
    dispatch(resetAutcompletePlacePredictions())
  }

  const handleOnSearchInitiated = () => {
    if (googleLoaded) {
      dispatch(initiateListingSearch())
    } else {
      console.warn("Google library isn't loaded yet")
    }
  }

  const handleOnOptionSelected = (autocompletePrediction: google.maps.places.AutocompletePrediction) => {
    dispatch(setLocationSearchField(autocompletePrediction.description))
    if (googleLoaded && googleMap) {
      dispatch(initiateListingSearch({
        placeId: autocompletePrediction.place_id,
        googleMap: googleMap
      }))
    } else {
      console.warn("The googleMap instance is not available")
    }
  }

  const handleOnInput = (details:string) => dispatch(setLocationSearchField(details))

  return (
    <header className={styles.Header}>
      <SearchField
        value={locationSearchField}
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
