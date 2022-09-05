import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { useGoogleMaps } from '../../context/google_maps_context'
import SearchField from '../form/SearchField/SearchField'
import styles from './Header.module.css'
import { DefaultAutocompleteOptions } from '../../config/googleMapsOptions'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { searchListings, selectSearchParams } from '../../store/listingSearch/listingSearchSlice'

const Header: NextPage = () => {
  const dispatch = useAppDispatch()
  const params = useAppSelector(selectSearchParams)
  const { googleLoaded } = useGoogleMaps()
  const [autocompleteService, setAutocompleteService] = useState<google.maps.places.AutocompleteService|null>(null)
  const [options, setOptions] = useState<google.maps.places.AutocompletePrediction[]>([])
  const [value, setValue] = useState<string>('')

  const handleOnGetPlaceAutocompletePredictions = async (val:string) => {
    if (autocompleteService) {
      const request = { input: val, types: ['geocode'], components: DefaultAutocompleteOptions.componentRestrictions }
      try {
        const res = await autocompleteService.getPlacePredictions(request)
        setOptions(res.predictions)
      } catch (error) {
        setOptions([])
        console.error(error)
      }
    }
  }

  const handleOnClearPlaceAutocompletePredictions = () => {
    setOptions([])
  }

  const handleOnSearchInitiated = () => {
    dispatch(searchListings(params))
  }

  const handleOnOptionSelected = (option: google.maps.places.AutocompletePrediction) => {
    setValue(option.description)
  }

  const handleOnInput = (details:string) => setValue(details)

  useEffect(() => {
    googleLoaded && setAutocompleteService(new google.maps.places.AutocompleteService())
  }, [googleLoaded])

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
