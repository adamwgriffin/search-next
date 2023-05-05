import type { AppState } from '..'
import type { ListingServiceGeotype } from '../../lib/types/listing_service_params_types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GoogleToServiceAddressTypeMapping } from '../../lib/geocoder'
import { DefaultAutocompleteOptions } from '../../config/googleMapsOptions'
import { doGeospatialGeocodeSearch } from '../listingSearch/listingSearchSlice'

export interface ListingMapGeocoderResult {
  type: keyof typeof GoogleToServiceAddressTypeMapping
  location: google.maps.LatLngLiteral
  viewport: google.maps.LatLngBoundsLiteral | object
}

export interface PlacesState {
  geocoderResult: ListingMapGeocoderResult
  autcompletePlacePredictions: google.maps.places.AutocompletePrediction[]
}

let autocompleteService: google.maps.places.AutocompleteService

const initialState: PlacesState = {
  geocoderResult: {
    // this is first type returned from the geocoder result. the orignal is stored here. it needs to be mapped to a
    // name that the Listing service understands when using it as the geotype param for a geolayer request
    type: 'neighborhood',
    // we're only using location for the geolayer request to the listing service
    location: {
      lat: 47.6792172,
      lng: -122.3860312
    },
    viewport: {}
  },
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
      types: ['geocode'],
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
    builder.addCase(doGeospatialGeocodeSearch.fulfilled, (state, action) => {
      if (action.payload.geocoderResult.length) {
        const { geometry, types } = action.payload.geocoderResult[0]
        state.geocoderResult = {
          type: types[0],
          location: geometry.location,
          viewport: geometry.viewport
        }
      } else {
        console.debug('In doGeospatialGeocodeSearch.fulfilled, nothing in payload.geocoderResult.')
      }
    })

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

export const selectGeoType = (state: AppState): ListingServiceGeotype => {
  return GoogleToServiceAddressTypeMapping[state.places.geocoderResult.type]
}

export const selectGeocoderResult = (state: AppState) =>
  state.places.geocoderResult

export const selectAutcompletePlacePredictions = (state: AppState) =>
  state.places.autcompletePlacePredictions

export default placesSlice.reducer
