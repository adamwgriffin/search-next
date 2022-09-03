import type { NextPage } from 'next'
import { useState } from 'react'

import SearchField from '../form/SearchField/SearchField'
import styles from './Header.module.css'
import { DefaultAutocompleteOptions } from '../../config/googleMapsOptions'

const Header: NextPage = () => {
  const [autocompleteService] = useState(new google.maps.places.AutocompleteService())
  const [options, setOptions] = useState<google.maps.places.AutocompletePrediction[]>([])
  const [value, setValue] = useState<string>('')

  const handleOnGetPlaceAutocompletePredictions = async (val:string) => {
    const request = { input: val, types: ['geocode'], components: DefaultAutocompleteOptions.componentRestrictions }
    try {
      const res = await autocompleteService.getPlacePredictions(request)
      setOptions(res.predictions)
    } catch (error) {
      setOptions([])
      console.error(error)
    }
  }

  const handleOnClearPlaceAutocompletePredictions = () => {
    setOptions([])
  }

  const handleOnSearchInitiated = () => console.log("onSearchInitiated triggered")

  const handleOnOptionSelected = (option: google.maps.places.AutocompletePrediction) => {
    setValue(option.description)
  }

  const handleOnInput = (details:string) => setValue(details)

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
