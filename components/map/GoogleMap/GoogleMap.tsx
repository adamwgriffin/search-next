import { type ReactNode, useRef, useEffect, useCallback } from 'react'
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

const GoogleMap: React.FC<GoogleMapProps> = ({
  options,
  bounds,
  zoom = 12,
  children,
  onDragStart,
  onDragEnd,
  onZoomChanged,
  onIdle
}) => {
  const mapEl = useRef(null)
  const { googleMap, setGoogleMap } = useGoogleMaps()

  const getCurrentMapState = useCallback((): GoogleMapState => {
    return {
      bounds: googleMap?.getBounds()?.toJSON(),
      center: googleMap?.getCenter()?.toJSON(),
      zoom: googleMap?.getZoom()
    }
  }, [googleMap])

  const createEventListeners = useCallback(() => {
    if (!googleMap) return
    const eventListenerMapping = {
      dragstart: onDragStart,
      dragend: onDragEnd,
      zoom_changed: onZoomChanged,
      idle: onIdle
    }
    for (const [eventName, callback] of Object.entries(eventListenerMapping)) {
      if (typeof callback !== 'function') continue
      eventListeners.push(
        google.maps.event.addListener(googleMap, eventName, () =>
          callback(getCurrentMapState())
        )
      )
    }
  }, [
    getCurrentMapState,
    googleMap,
    onDragEnd,
    onDragStart,
    onIdle,
    onZoomChanged
  ])

  const destroyEventListeners = useCallback(() => {
    eventListeners.forEach((eventListener) =>
      google.maps.event.removeListener(eventListener)
    )
    eventListeners.length = 0
  }, [])

  useEffectOnce(() => {
    if (mapEl.current) {
      setGoogleMap(new google.maps.Map(mapEl.current, options))
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
  }, [createEventListeners, destroyEventListeners, googleMap])

  return (
    <div ref={mapEl} id={styles.googleMap}>
      {googleMap && children}
    </div>
  )
}

export default GoogleMap
