import type { Libraries, LoaderOptions } from '@googlemaps/js-api-loader'

export const GoogleMapsStreetViewURL =
  'https://maps.googleapis.com/maps/api/streetview'

export const GoogleStreetViewMaxImageSize = 640

// options for @googlemaps/loader, which loads Google Maps by creating a script
// tag with these params in it. things like your api key and the libraries you
// want to load go here
export const GoogleMapsLoaderOptions: LoaderOptions = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  version: 'quarterly'
}

export const GoogleMapsLibraries: Libraries = ['maps', 'places', 'marker']

// default options for the map itself, such as what UI controls to enable, etc.
// seems that we can't use Object.freeze on this object, otherwise the map won't
// load
export const GoogleMapsMapOptions: google.maps.MapOptions = {
  // using a mapId is required for using AdvancedMarkerView
  mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID!,
  center: {
    lat: 47.6560479,
    lng: -122.3603527
  },
  clickableIcons: false,
  zoom: 12,
  zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false
}

export const GoogleMapsAutocompleteOptions = {
  // types restricts the autocomplete results to only a specific set of place
  // types. The "geocode" type seems to be the only decent choice for both
  // addresses and places like neighborhoods/cities/states, etc. The places API
  // has weird, strict rules about what types you can and can't use, which makes
  // it really difficult to get very granular with the specific types we would
  // normally want to use.
  types: ['geocode'],
  componentRestrictions: { country: ['us'] }
}

export const GoogleMapsPolygonOptions: google.maps.PolygonOptions = {
  strokeColor: 'darkgray',
  strokeOpacity: 1,
  strokeWeight: 2,
  fillOpacity: 0
}
