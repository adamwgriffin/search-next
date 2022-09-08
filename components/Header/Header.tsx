import type { NextPage } from 'next'
import { useGoogleMaps } from '../../context/google_maps_context'
import SearchField from '../form/SearchField/SearchField'
import styles from './Header.module.css'
import { useAppSelector, useAppDispatch } from '../../hooks'
import {
  setLocationSearchField,
  resetListings,
  searchListings,
  selectLocationSearchField,
  selectSearchParams
} from '../../store/listingSearch/listingSearchSlice'
import {
  getPlaceAutocompletePredictions,
  resetAutcompletePlacePredictions,
  getPlaceAutocompleteDetails,
  selectAutcompletePlacePredictions,
  selectGeocoderResult,
  selectGeoType
} from '../../store/places/placesSlice'
import { setBoundaryActive, getGeoLayer, selectBufferMiles } from '../../store/listingMap/listingMapSlice'

const Header: NextPage = () => {
  const dispatch = useAppDispatch()
  const value = useAppSelector(selectLocationSearchField)
  const params = useAppSelector(selectSearchParams)
  const options = useAppSelector(selectAutcompletePlacePredictions)
  const geocoderResult = useAppSelector(selectGeocoderResult)
  const geotype = useAppSelector(selectGeoType)
  const bufferMiles = useAppSelector(selectBufferMiles)
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
      dispatch(setBoundaryActive(true))
      dispatch(setLocationSearchField(option.description))
      dispatch(resetListings())
      dispatch(getPlaceAutocompleteDetails({ placeId: option.place_id, googleMap: googleMap}))
      dispatch(getGeoLayer({
        center_lat: geocoderResult.location.lat,
        center_lon: geocoderResult.location.lng,
        geotype: geotype,
        buffer_miles: bufferMiles,
        source: 'agent website'
      }))
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
