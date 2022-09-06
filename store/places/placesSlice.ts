import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState } from '..'
import { GoogleToServiceAddressTypeMapping } from '../../lib/constants/geocoder_constants'
import { DefaultAutocompleteOptions } from '../../config/googleMapsOptions'

export interface ListingMapGeocoderResult {
  type: string | null
  location: google.maps.LatLngLiteral
  viewport: google.maps.LatLngBoundsLiteral | object
}

export interface PlacesState {
  geocoderResult: ListingMapGeocoderResult
  autcompletePlacePredictions: google.maps.places.AutocompletePrediction[]
}

export interface PlaceDetailsResponse {
  results: google.maps.places.PlaceResult | null
  status: google.maps.places.PlacesServiceStatus
}

export interface GetPlaceAutocompleteDetailsPayload {
  placeId: string
  googleMap: google.maps.Map
}

let geocoder: google.maps.Geocoder
let autocompleteService: google.maps.places.AutocompleteService
let placesService: google.maps.places.PlacesService

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

export const geocodeMap = createAsyncThunk(
  'places/geocodeMap',
  async (
    request: google.maps.GeocoderRequest
  ): Promise<google.maps.GeocoderResult> => {
    geocoder ||= new google.maps.Geocoder()
    const res = await geocoder.geocode(request)
    return res.results[0]
  }
)

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

// PlacesService doesn't support the promise API yet, so we're wrapping the callback request in a promise
const getPlaceDetails = (
  request: google.maps.places.PlaceDetailsRequest
): Promise<PlaceDetailsResponse> => {
  return new Promise((resolve, reject) => {
    placesService.getDetails(request, (results, status) => {
      status === 'OK' ? resolve({ results, status }) : reject(new Error(status))
    })
  })
}

export const getPlaceAutocompleteDetails = createAsyncThunk(
  'places/getPlaceAutocompleteDetails',
  async ({
    placeId,
    // we need the map to create a PlacesService instance but the GoogleMapsContext it's in is only available to
    // components that are inside <GoogleMapsProvider>, so we will need to pass the map in with the request
    googleMap
  }: GetPlaceAutocompleteDetailsPayload): Promise<google.maps.places.PlaceResult | null> => {
    placesService ||= new google.maps.places.PlacesService(googleMap)
    const res = await getPlaceDetails({
      placeId,
      fields: ['address_component', 'geometry']
    })
    return res.results
  }
)

export const placesSlice = createSlice({
  name: 'places',

  initialState,

  reducers: {
    resetAutcompletePlacePredictions: (state) => {
      state.autcompletePlacePredictions = initialState.autcompletePlacePredictions
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(
        geocodeMap.fulfilled,
        (state, action: PayloadAction<google.maps.GeocoderResult>) => {
          const { location, viewport } = action.payload.geometry
          state.geocoderResult = {
            type: action.payload.types[0],
            location: location.toJSON(), // calling toJSON() returns the LatLngBounds instance as a LatLngLiteral
            viewport
          }
        }
      )
      .addCase(
        getPlaceAutocompletePredictions.fulfilled,
        (
          state,
          action: PayloadAction<google.maps.places.AutocompletePrediction[]>
        ) => {
          state.autcompletePlacePredictions = action.payload
        }
      )
      .addCase(
        getPlaceAutocompleteDetails.fulfilled,
        (
          state,
          action: PayloadAction<google.maps.places.PlaceResult | null>
        ) => {
          const { address_components, geometry } = action.payload || {}
          if (address_components && geometry?.location && geometry?.viewport) {
            state.geocoderResult = {
              type: address_components[0].types[0],
              location: geometry.location.toJSON(),
              viewport: geometry.viewport
            }
          } else {
            console.warn(
              'getPlaceAutocompleteDetails payload was empty, action.payload:',
              action.payload
            )
          }
        }
      )
  }
})

export const { resetAutcompletePlacePredictions } = placesSlice.actions

export const selectGeoType = (state: AppState) => {
  // @ts-ignore
  return GoogleToServiceAddressTypeMapping[state.places.geocoderResult.type]
}

export const selectAutcompletePlacePredictions = (state: AppState) => state.places.autcompletePlacePredictions

export default placesSlice.reducer
