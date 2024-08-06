import { useRef, useEffect, ReactNode } from 'react'
import { useEffectOnce } from 'react-use'
import { useGoogleMaps } from '../../../providers/GoogleMapsProvider'
import styles from './GoogleMap.module.css'

export type GoogleMapProps = {
  options: google.maps.MapOptions
  bounds?: google.maps.LatLngBoundsLiteral | null
  zoom?: number
  onDragStart?: (currentMapState: GoogleMapState) => void
  onDragEnd?: (currentMapState: GoogleMapState) => void
  onZoomChanged?: (currentMapState: GoogleMapState) => void
  onIdle?: (currentMapState: GoogleMapState) => void
  children: ReactNode
}

export type GoogleMapState = {
  bounds: google.maps.LatLngBoundsLiteral | undefined
  center: google.maps.LatLngLiteral | undefined
  zoom: number | undefined
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
    if (!googleMap) {
      throw new Error('googleMap is not available.')
    }
    return {
      bounds: googleMap.getBounds()?.toJSON(),
      center: googleMap.getCenter()?.toJSON(),
      zoom: googleMap.getZoom()
    }
  }

  // a generic handler for event props that just returns data about the map state if the event prop was defined
  const eventHandlerFactoryFunc = (
    fn: Function | undefined
  ): Function | undefined => {
    if (fn) return () => fn(getCurrentMapState())
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
