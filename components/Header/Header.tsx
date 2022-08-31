import type { NextPage } from 'next'
import { useState } from 'react'

import SearchField from '../form/SearchField/SearchField'
import styles from './Header.module.css'
import { getPlacePredictions } from '../../lib/google'
import { autocompleteOptions } from '../../config/google'

const Header: NextPage = () => {
  const [options, setOptions] = useState<google.maps.places.AutocompletePrediction[]>([])
  const [value, setValue] = useState<string>('')

  const handleOnGetPlaceAutocompletePredictions = async (val:string) => {
    const params = { input: val, types: ['geocode'], components: autocompleteOptions.componentRestrictions }
    try {
      const res = await getPlacePredictions(params)
      if (res.status === 'OK') {
        res.results ? setOptions(res.results) : setOptions([])
      } else {
        throw new Error("Request to autocomplete service did not return OK")   
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'ZERO_RESULTS') {
        setOptions([])
      } else {
        setOptions([])
        console.error(error)
      }
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
