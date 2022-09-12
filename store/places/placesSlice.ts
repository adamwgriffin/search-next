import type { AppState } from '..'
import type { SerializedPlaceResult } from '../../lib/places_service_wrapper'
import { getPlaceDetails } from '../../lib/places_service_wrapper'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
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

export interface SerializedGeocoderResult extends Omit<google.maps.GeocoderResult, 'geometry'> {
  geometry: {
    location: google.maps.LatLngLiteral
    location_type: google.maps.GeocoderLocationType
    viewport: google.maps.LatLngBoundsLiteral
    bounds?: google.maps.LatLngBoundsLiteral
  }
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

// since we are using redux for state management we want to serialize the response from the geocoder as a plain
// javascript object. redux will give a warning about using complex objects otherwise. location and viewport are
// returned as instances of LatLng & LatLngBounds so we convert them to their POJO equivalents LatLngLiteral &
// LatLngBoundsLiteral with toJSON().
export const seralizeGeocoderResult = (result: google.maps.GeocoderResult): SerializedGeocoderResult => {
  return {
    ...result,
    geometry: {
      location: result.geometry.location.toJSON(),
      location_type: result.geometry.location_type,
      viewport: result.geometry.viewport.toJSON(),
      bounds: result.geometry?.bounds?.toJSON()
    }
  }
}

export const geocodeMap = createAsyncThunk(
  'places/geocodeMap',
  async (
    request: google.maps.GeocoderRequest
  ): Promise<SerializedGeocoderResult> => {
    geocoder ||= new google.maps.Geocoder()
    const res = await geocoder.geocode(request)
    return seralizeGeocoderResult(res.results[0])
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

export const getPlaceAutocompleteDetails = createAsyncThunk(
  'places/getPlaceAutocompleteDetails',
  async (placeId: string): Promise<SerializedPlaceResult | null> => {
    // for some reason google requires this "service" to take either a Map instance or a <div> as an argument to create
    // it, so we're just creating a dummy div element that's not attached to the dom to workaround this.
    placesService ||= new google.maps.places.PlacesService(document.createElement('div'))
    const res = await getPlaceDetails(
      {
        placeId,
        fields: ['address_component', 'geometry']
      },
      placesService
    )
    return res.results
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
      geocodeMap.fulfilled,
      (state, action: PayloadAction<SerializedGeocoderResult>) => {
        const { location, viewport } = action.payload.geometry
        state.geocoderResult = {
          type: action.payload.types[0],
          location,
          viewport
        }
      }
    )

    builder.addCase(
      getPlaceAutocompletePredictions.fulfilled,
      (
        state,
        action: PayloadAction<google.maps.places.AutocompletePrediction[]>
      ) => {
        state.autcompletePlacePredictions = action.payload
      }
    )

    builder.addCase(
      getPlaceAutocompleteDetails.fulfilled,
      (state, action: PayloadAction<SerializedPlaceResult | null>) => {
        const { address_components, geometry } = action.payload || {}
        if (address_components && geometry?.location && geometry?.viewport) {
          state.geocoderResult = {
            type: address_components[0].types[0],
            location: geometry.location,
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

export const selectGeocoderResult = (state: AppState) => state.places.geocoderResult

export const selectAutcompletePlacePredictions = (state: AppState) =>
  state.places.autcompletePlacePredictions

export default placesSlice.reducer
