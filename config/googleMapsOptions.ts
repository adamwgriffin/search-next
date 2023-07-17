import type { Libraries, LoaderOptions } from '@googlemaps/js-api-loader'

// options for @googlemaps/loader, which loads Google Maps by creating a script tag with these params in it. things like
// your api key and the libraries you want to load go here
export const DefaultGoogleMapsLoaderOptions: LoaderOptions = {
  apiKey: '',
  // TODO: change this once AdvancedMarkerView is out of beta
  version: 'beta'
}

export const AppGoogleMapsLoaderOptions: LoaderOptions = {
  ...DefaultGoogleMapsLoaderOptions,
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!
}

export const GoogleMapsLibraries: Libraries = ['maps', 'places', 'marker']

// default options for the map itself, such as what UI controls to enable, etc.
// seems that we can't use Object.freeze on this object, otherwise the map won't load
export const DefaultMapOptions: google.maps.MapOptions = {
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

export const DefaultAutocompleteOptions = {
  fields: ['place_id', 'address_components', 'geometry', 'icon', 'name'],
  componentRestrictions: { country: ['us', 'ca', 'mx'] }
}

export const MapBoundaryOptions: google.maps.PolygonOptions = {
  strokeColor: 'darkgray',
  strokeOpacity: 1,
  strokeWeight: 2,
  fillOpacity: 0
}
