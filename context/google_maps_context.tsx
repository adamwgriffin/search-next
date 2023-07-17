import { createContext, useContext, useState, ReactNode } from 'react'
import { useEffectOnce } from 'react-use'
import type { NextPage } from 'next'
import type { Dispatch } from 'react'
import type { LoaderOptions } from '@googlemaps/js-api-loader'
import { Loader } from '@googlemaps/js-api-loader'
import { DefaultGoogleMapsLoaderOptions } from '../config/googleMapsOptions'

export interface GoogleMapsContextInterface {
  googleLoaded: boolean
  googleMap: google.maps.Map | null
  setGoogleMap: Dispatch<google.maps.Map>
}

export interface GoogleMapsProviderProps {
  children: ReactNode
  loaderOptions?: LoaderOptions
}

const GoogleMapsContext = createContext<GoogleMapsContextInterface>({
  googleLoaded: false,
  googleMap: null,
  setGoogleMap: () => {}
})

// import this into any component that is wrapped inside of <GoogleMapsProvider> in order to use it's state/functions.
// e.g., const { googleLoaded } = useGoogleMaps()
export const useGoogleMaps = () => useContext(GoogleMapsContext)

// wrap <GoogleMapsProvider> around all components that need access to GoogleMapsContext
const GoogleMapsProvider: NextPage<GoogleMapsProviderProps> = ({
  children,
  loaderOptions = DefaultGoogleMapsLoaderOptions
}) => {
  const [googleLoaded, setGoogleLoaded] = useState(false)
  // this will be set later by the GoogleMap component since it generates the div we need to create the map instance
  const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null)

  // there is no npm module for the google maps api. you have to load it via a script tag. @googlemaps/js-api-loader
  // just creates a nice interface that you can use to create the script tag dynamically, and returns a promise that
  // will resolve once its loaded. this way you can execute whatever code depends on the api after the promise resolves.
  useEffectOnce(() => {
    const initializeGoogleMaps = async () => {
      if (typeof google === 'undefined') await new Loader(loaderOptions).load()
      setGoogleLoaded(true)
    }
    initializeGoogleMaps().catch((error) =>
      console.error('Unable to load Google Maps API', error)
    )
  })

  // passing the specific data we want as an object to the value prop in the Provider component is what makes it
  // available to child components that use the context
  const value = { googleLoaded, googleMap, setGoogleMap }
  return (
    <GoogleMapsContext.Provider value={value}>
      {children}
    </GoogleMapsContext.Provider>
  )
}

export default GoogleMapsProvider
