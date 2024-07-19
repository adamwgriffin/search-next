import type { AppState } from '..'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GoogleMapsAutocompleteOptions } from '../../config/googleMapsOptions'

export interface AutocompleteState {
  autcompletePlacePredictions: google.maps.places.AutocompletePrediction[]
}

let autocompleteService: google.maps.places.AutocompleteService

const initialState: AutocompleteState = {
  autcompletePlacePredictions: []
}

export const getPlaceAutocompletePredictions = createAsyncThunk(
  'places/getPlaceAutocompletePredictions',
  async (
    searchString: string
  ): Promise<google.maps.places.AutocompletePrediction[]> => {
    autocompleteService ||= new google.maps.places.AutocompleteService()
    const res = await autocompleteService.getPlacePredictions({
      input: searchString,
      // restrict autocomplete results to only the boundary types that we currently have available
      types: [
        'administrative_area_level_1', // state
        'administrative_area_level_2', // county
        'postal_code', // zip_code
        'locality', // city
        'neighborhood'
      ],
      componentRestrictions: GoogleMapsAutocompleteOptions.componentRestrictions
    })
    return res.predictions
  }
)

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
      (
        state,
        action: PayloadAction<google.maps.places.AutocompletePrediction[]>
      ) => {
        state.autcompletePlacePredictions = action.payload
      }
    )
  }
})

export const { resetAutcompletePlacePredictions } = autocompleteSlice.actions

export const selectAutcompletePlacePredictions = (state: AppState) =>
  state.autocomplete.autcompletePlacePredictions

export default autocompleteSlice.reducer
