import { Loader, LoaderOptions } from '@googlemaps/js-api-loader'
import { mapLoaderOptions } from '../config/google'

export interface GeocoderResponseWithStatus {
  results: Array<google.maps.GeocoderResult> | null
  status: google.maps.GeocoderStatus
}

export interface PlaceResultWithStatus {
  results: google.maps.places.PlaceResult | null
  status: google.maps.places.PlacesServiceStatus
}

export interface GoogleMapState {
  bounds: google.maps.LatLngBoundsLiteral|undefined
  center: google.maps.LatLngLiteral|undefined
  zoom: number|undefined
}

let geocoder: google.maps.Geocoder
export let googleMap: google.maps.Map
export let autocompleteService: google.maps.places.AutocompleteService
export let placesService: google.maps.places.PlacesService

/* there is no npm module for the google maps api. you have to load it via a script tag. @googlemaps/js-api-loader
just creates a nice interface that you can use to create the script tag dynamically, and returns a promise that will
resolve once its loaded. this way you can execute whatever code depends on the api after the promise resolves. */
export const loadGoogle = async (
  loaderOptions: LoaderOptions = mapLoaderOptions
) => {
  if (typeof google === 'undefined') await new Loader(loaderOptions).load()
  setGeocoder(new google.maps.Geocoder())
  setAutocompleteService()
}

export const setMap = (mapDiv: HTMLElement, opts: google.maps.MapOptions): google.maps.Map => {
  googleMap = new google.maps.Map(mapDiv, opts)
  // setting this here since it requires the map
  setPlacesService(googleMap)
  return googleMap
}

export const getCurrentMapState = (): GoogleMapState => {
  return {
    bounds: googleMap?.getBounds()?.toJSON(),
    center: googleMap?.getCenter()?.toJSON(),
    zoom: googleMap?.getZoom(),
  }
}

export const setGeocoder = (geocoderInstance: google.maps.Geocoder) => {
  geocoder = geocoderInstance
}

export const setAutocompleteService = () => {
  autocompleteService = new google.maps.places.AutocompleteService()
}

export const setPlacesService = (map: google.maps.Map) => {
  placesService = new google.maps.places.PlacesService(map)
}

// TODO: try using new promise API that's available instead of wrapping in a promise here.
export const geocode = (
  request: google.maps.GeocoderRequest
): Promise<GeocoderResponseWithStatus> => {
  return new Promise((resolve, reject) => {
    geocoder.geocode(request, (results, status) => {
      status === 'OK' ? resolve({ results, status }) : reject(new Error(status))
    })
  })
}

// TODO: try using new promise API that's available instead of wrapping in a promise here.
export const getPlaceDetails = (
  request: google.maps.places.PlaceDetailsRequest
): Promise<PlaceResultWithStatus> => {
  return new Promise((resolve, reject) => {
    placesService.getDetails(request, (results, status) => {
      status === 'OK' ? resolve({ results, status }) : reject(new Error(status))
    })
  })
}
