import { Loader } from '@googlemaps/js-api-loader'
import { mapLoaderOptions } from '../config/google'

let geocoder = null
export let googleMap = null
export let autocompleteService = null
export let placesService = null

/* there is no npm module for the google maps api. you have to load it via a script tag. @googlemaps/js-api-loader
just creates a nice interface that you can use to create the script tag dynamically, and returns a promise that will
resolve once its loaded. this way you can execute whatever code depends on the api after the promise resolves. */
export const loadGoogle = async () =>  {
  if (typeof google === 'undefined') await new Loader(mapLoaderOptions).load()
  setGeocoder(new google.maps.Geocoder())
  setAutocompleteService()
  return true
}

export const setMap = (mapDiv, opts) => {
  googleMap = new google.maps.Map(mapDiv, opts)
  // setting this here since it requires the map
  setPlacesService(googleMap)
  return googleMap
}

export const setGeocoder = (geocoderInstance) => {
  geocoder = geocoderInstance
}

export const setAutocompleteService = () => {
  autocompleteService = new google.maps.places.AutocompleteService
}

export const setPlacesService = (map) => {
  placesService = new google.maps.places.PlacesService(map)
}

export const geocode = (request) => {
  return new Promise((resolve, reject) => {
    geocoder.geocode(request, (results, status) => {
      status === 'OK' ? resolve({ results, status }) : reject(new Error(status))
    })
  })
}

export const getPlacePredictions = (request) => {
  return new Promise((resolve, reject) => {
    autocompleteService.getPlacePredictions(request, (results, status) => {
      status === 'OK' ? resolve({ results, status }) : reject(new Error(status))
    })
  })
}

export const getPlaceDetails = (request) => {
  return new Promise((resolve, reject) => {
    placesService.getDetails(request, (results, status) => {
      status === 'OK' ? resolve({ results, status }) : reject(new Error(status))
    })
  })
}
