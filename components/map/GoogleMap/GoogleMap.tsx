import type { NextPage } from 'next'
import { useRef, useEffect, ReactNode } from 'react'
import { useEffectOnce } from 'react-use'
import { useGoogleMaps } from '../../../context/google_maps_context'
import styles from './GoogleMap.module.css'

export interface GoogleMapProps {
  options: google.maps.MapOptions
  bounds?: google.maps.LatLngBoundsLiteral | null
  zoom?: number
  onDragStart?: (currentMapState: GoogleMapState) => void
  onDragEnd?: (currentMapState: GoogleMapState) => void
  onZoomChanged?: (currentMapState: GoogleMapState) => void
  onIdle?: (currentMapState: GoogleMapState) => void
  children: ReactNode
}

export interface GoogleMapState {
  bounds: google.maps.LatLngBoundsLiteral
  center: google.maps.LatLngLiteral
  zoom: number
}

const eventListeners: google.maps.MapsEventListener[] = []

const GoogleMap: NextPage<GoogleMapProps> = (props) => {
  const {
    options,
    bounds,
    zoom = 12,
    children,
    onDragStart,
    onDragEnd,
    onZoomChanged,
    onIdle
  } = props
  const mapEl = useRef(null)
  const { googleMap, setGoogleMap } = useGoogleMaps()

  const getCurrentMapState = (): GoogleMapState => {
    // each of these values can potentially be undefined, which Typescript complains about. since we depend on these
    // values in other parts of the app it's probably better to just throw an exception rather than potentially return
    // bad data.
    if (!googleMap) {
      throw new Error('googleMap is not available.')
    }
    const bounds = googleMap.getBounds()
    if (typeof bounds === 'undefined') {
      throw new Error(
        'No bounds available from getBounds(). The map is not yet initialized or center and zoom have not been set.'
      )
    }
    const center = googleMap.getCenter()
    if (typeof center === 'undefined') {
      throw new Error(
        'No center available from getCenter(). Center or bounds have not been set '
      )
    }
    const zoom = googleMap.getZoom()
    if (typeof zoom === 'undefined') {
      throw new Error('Zoom has not been set')
    }
    return {
      bounds: bounds.toJSON(),
      center: center.toJSON(),
      zoom: zoom
    }
  }

  // a generic handler for event props that just returns data about the map state if the event prop was defined
  const eventHandlerFactoryFunc = (fn: Function|undefined): Function|undefined => {
    if(fn) return () => fn(getCurrentMapState())
  }

  const eventListenerMapping = {
    dragstart: eventHandlerFactoryFunc(onDragStart),
    dragend: eventHandlerFactoryFunc(onDragEnd),
    zoom_changed: eventHandlerFactoryFunc(onZoomChanged),
    idle: eventHandlerFactoryFunc(onIdle)
  }

  const createEventListeners = () => {
    for (const [eventName, callback] of Object.entries(eventListenerMapping)) {
      if (googleMap && typeof callback === 'function') {
        eventListeners.push(
          google.maps.event.addListener(googleMap, eventName, callback)
        )  
      }
    }
  }

  const destroyEventListeners = () => {
    eventListeners.forEach((eventListener) =>
      google.maps.event.removeListener(eventListener)
    )
  }

  useEffectOnce(() => {
    if (mapEl.current !== null) {
      setGoogleMap(new google.maps.Map(mapEl.current, options))
    } else {
      throw new Error(
        'Reference to map container div is null. Unable to create map instance.'
      )
    }
  })

  useEffect(() => {
    if (bounds && googleMap) {
      googleMap.fitBounds(bounds)
    }
  }, [bounds, googleMap])
  
  useEffect(() => {
    if (googleMap && googleMap.getZoom() !== zoom) {
      googleMap.setZoom(zoom)
    }
  }, [zoom, googleMap])

  useEffect(() => {
    if (googleMap) {
      createEventListeners()
    }
    return destroyEventListeners
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleMap, onDragStart, onDragEnd, onZoomChanged, onIdle])

  return (
    <div ref={mapEl} id={styles.googleMap}>
      {googleMap && children}
    </div>
  )
}

export default GoogleMap
