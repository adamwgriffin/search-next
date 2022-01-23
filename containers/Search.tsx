import { useState, useEffect } from "react"
import { Loader } from '@googlemaps/js-api-loader'
import { mapOptions, mapLoaderOptions } from '../config/google'
import type { NextPage } from 'next'
import GoogleMap from '../components/GoogleMap'

declare global {
  interface Window { google: any; }
}

const defaultLocations = [
  {
    position: {
      lat: 48.160910,
      lng: 16.383330,
    },
  },
  {
    position: {
      lat: 48.174270,
      lng: 16.329620,
    },
  },
  // prague
  {
    position: {
      lat: 50.075,
      lng: 14.4378,
    },
  },
  // budapest
  {
    position: {
      lat: 47.4979,
      lng: 19.0402,
    },
  }
]

const initializeGoogleMaps = async (setGoogleLoaded: Function) => {
  if (typeof window.google === 'undefined') {
    // @ts-expect-error interface says I need "apiKey" and can't use "client" which is not true
    await new Loader(mapLoaderOptions).load()
    setGoogleLoaded(true)
  }
}

const mapTemplate = () => {
  return (
    <GoogleMap options={mapOptions}>
    </GoogleMap>
  )
}

const Search: NextPage = () => {
  const [googleLoaded, setGoogleLoaded] = useState(false)
  const [locations, setLocations] = useState(defaultLocations)

  useEffect(() => {
    initializeGoogleMaps(setGoogleLoaded)
  })
    
  return (
    <div>
      {googleLoaded && mapTemplate()}
    </div>
  )
}

export default Search
