import type { AppState } from '..'
import { createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from '../../lib/store_helpers'
import { GoogleMapsAutocompleteOptions } from '../../config/googleMapsOptions'

export interface AutocompleteState {
  autcompletePlacePredictions: google.maps.places.AutocompletePrediction[]
}

let autocompleteService: google.maps.places.AutocompleteService

const initialState: AutocompleteState = {
  autcompletePlacePredictions: []
}

export const getPlaceAutocompletePredictions = createAppAsyncThunk<
  google.maps.places.AutocompletePrediction[],
  string
>('places/getPlaceAutocompletePredictions', async (searchString: string) => {
  autocompleteService ||= new google.maps.places.AutocompleteService()
  const res = await autocompleteService.getPlacePredictions({
    input: searchString,
    ...GoogleMapsAutocompleteOptions
  })
  return res.predictions
})

export const autocompleteSlice = createSlice({
  name: 'autocomplete',

  initialState,

  reducers: {
    resetAutcompletePlacePredictions: (state) => {
      state.autcompletePlacePredictions =
        initialState.autcompletePlacePredictions
    }
  },

  extraReducers: (builder) => {
    builder.addCase(
      getPlaceAutocompletePredictions.fulfilled,
      (state, action) => {
        state.autcompletePlacePredictions = action.payload
      }
    )
  }
})

export const { resetAutcompletePlacePredictions } = autocompleteSlice.actions

export const selectAutcompletePlacePredictions = (state: AppState) =>
  state.autocomplete.autcompletePlacePredictions

export default autocompleteSlice.reducer
