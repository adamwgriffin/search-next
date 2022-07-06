import type { LoaderOptions } from '@googlemaps/js-api-loader'

// options for @googlemaps/loader, which loads Google Maps by creating a script tag with these params in it. things like
// your api key and the libraries you want to load go here
export const mapLoaderOptions: LoaderOptions = {
  apiKey: '',
  client: "gme-windermeresolutions",
  libraries: ['drawing', 'places', 'geometry']
}

// default options for the map itself, such as what UI controls to enable, etc.
// seems that we can't use Object.freeze on this object, otherwise the map won't load
export const mapOptions: google.maps.MapOptions = {
  center: {
    lat: 37.76022,
    lng: -122.41415
  },
  clickableIcons: false,
  zoom: 11,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
  // passing any style causes the Google logo to appear white
  styles: [{ stylers: [{}] }]
}
