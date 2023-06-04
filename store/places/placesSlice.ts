import type { AppState } from '..'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DefaultAutocompleteOptions } from '../../config/googleMapsOptions'

export interface PlacesState {
  autcompletePlacePredictions: google.maps.places.AutocompletePrediction[]
}

let autocompleteService: google.maps.places.AutocompleteService

const initialState: PlacesState = {
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
      componentRestrictions: DefaultAutocompleteOptions.componentRestrictions
    })
    return res.predictions
  }
)

export const placesSlice = createSlice({
  name: 'places',

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

export const { resetAutcompletePlacePredictions } = placesSlice.actions

export const selectAutcompletePlacePredictions = (state: AppState) =>
  state.places.autcompletePlacePredictions

export default placesSlice.reducer
