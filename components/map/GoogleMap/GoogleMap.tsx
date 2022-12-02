import type { NextPage } from 'next'
import { useRef, useEffect, ReactNode } from 'react'
import { useEffectOnce } from 'react-use'
import { useGoogleMaps } from '../../../context/google_maps_context'
import styles from './GoogleMap.module.css'

export interface GoogleMapProps {
  options: google.maps.MapOptions
  bounds?: google.maps.LatLngBoundsLiteral | null
  onDragStart?: (currentMapState: GoogleMapState) => void
  onDragEnd?: (currentMapState: GoogleMapState) => void
  onUserChangedZoom?: (currentMapState: GoogleMapState) => void
  onIdle?: (currentMapState: GoogleMapState) => void
  children: ReactNode
}

export interface GoogleMapState {
  bounds: google.maps.LatLngBoundsLiteral
  center: google.maps.LatLngLiteral
  zoom: number
}

const eventListeners: google.maps.MapsEventListener[] = []
// a side effect of calling fitBounds() inside the useEffect function for bounds is that it will trigger a
// "zoom_changed" event. we only want to call the onUserChangedZoom() event callback if the user actually took some
// action to trigger "zoom_changed", like clicking the zoom button on the map. the recommended way of handling this is
// to set a flag to indicate this, hence zoomChangedProgrammatically. it's just a normal variable because making it
// state with useState wasn't working correctly and isn't really necessary. it's outside the component because it was
// getting reset to false every time the componenet re-rendered.
let zoomChangedProgrammatically = false

const GoogleMap: NextPage<GoogleMapProps> = (props) => {
  const {
    options,
    bounds,
    children,
    onDragStart,
    onDragEnd,
    onUserChangedZoom,
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

  const handleZoomChanged = () => {
    // only call onUserChangedZoom() if the user took some action to trigger the "zoom_changed" event
    if (!zoomChangedProgrammatically) {
      typeof onUserChangedZoom === 'function' &&
        onUserChangedZoom(getCurrentMapState())
    } else {
      // reset the flag after handling the event
      zoomChangedProgrammatically = false
    }
  }

  // a generic handler for event props that just returns data about the map state if the event prop was defined
  const eventHandlerFactoryFunc = (fn: Function|undefined): Function|undefined => {
    if(fn) return () => fn(getCurrentMapState())
  }

  const eventListenerMapping = {
    dragstart: eventHandlerFactoryFunc(onDragStart),
    dragend: eventHandlerFactoryFunc(onDragEnd),
    zoom_changed: handleZoomChanged,
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
      // calling fitBounds() below will trigger a "zoom_changed" event, which we want to ignore in our
      // handleZoomChanged() event handler so set this flag
      zoomChangedProgrammatically = true
      // sets the viewport to contain the given bounds
      googleMap.fitBounds(bounds)
    }
  }, [bounds, googleMap])

  useEffect(() => {
    createEventListeners()
    return destroyEventListeners
  }, [onDragStart, onDragEnd, onUserChangedZoom, onIdle])

  return (
    <div ref={mapEl} id={styles.googleMap}>
      {googleMap && children}
    </div>
  )
}

export default GoogleMap
