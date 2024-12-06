import { type ReactNode, useRef, useEffect, useCallback } from 'react'
import { useGoogleMaps } from '../../../providers/GoogleMapsProvider'
import styles from './GoogleMap.module.css'

export type GoogleMapState = {
  bounds: google.maps.LatLngBoundsLiteral | undefined
  center: google.maps.LatLngLiteral | undefined
  zoom: number | undefined
}

export type GoogleMapProps = {
  options: google.maps.MapOptions
  bounds?: google.maps.LatLngBoundsLiteral | null
  zoom?: number
  onDragEnd?: (currentMapState: GoogleMapState) => void
  onUserChangedZoom?: (currentMapState: GoogleMapState) => void
  onIdle?: (currentMapState: GoogleMapState) => void
  children: ReactNode
}

let zoomChangedProgrammatically = false

const GoogleMap: React.FC<GoogleMapProps> = ({
  options,
  bounds,
  zoom = 12,
  children,
  onDragEnd,
  onUserChangedZoom,
  onIdle
}) => {
  const mapEl = useRef<HTMLDivElement>(null)
  const { googleMap, setGoogleMap } = useGoogleMaps()

  const getCurrentMapState = useCallback((): GoogleMapState => {
    return {
      bounds: googleMap?.getBounds()?.toJSON(),
      center: googleMap?.getCenter()?.toJSON(),
      zoom: googleMap?.getZoom()
    }
  }, [googleMap])

  useEffect(() => {
    if (!mapEl.current) return
    if (!googleMap) {
      setGoogleMap(new google.maps.Map(mapEl.current, options))
    } else {
      googleMap.setOptions(options)
    }
  }, [googleMap, options, setGoogleMap])

  useEffect(() => {
    if (googleMap && googleMap.getZoom() !== zoom) {
      googleMap.setZoom(zoom)
    }
  }, [zoom, googleMap])

  // A side effect of calling fitBounds() is that it will trigger a
  // "zoom_changed" event. We only want to call the onUserChangedZoom() event
  // callback if the user actually took some action to trigger "zoom_changed" so
  // we set this flag and unset it later so we can tell.
  useEffect(() => {
    if (bounds && googleMap) {
      zoomChangedProgrammatically = true
      googleMap.fitBounds(bounds)
    }
  }, [bounds, googleMap])

  useEffect(() => {
    if (!googleMap) return
    const eventListeners: google.maps.MapsEventListener[] = []
    eventListeners.push(
      google.maps.event.addListener(googleMap, 'dragend', () =>
        onDragEnd?.(getCurrentMapState())
      )
    )
    eventListeners.push(
      google.maps.event.addListener(googleMap, 'zoom_changed', () => {
        if (!zoomChangedProgrammatically) {
          onUserChangedZoom?.(getCurrentMapState())
        }
      })
    )
    eventListeners.push(
      google.maps.event.addListener(googleMap, 'idle', () => {
        // On first load zoomChangedProgrammatically gets set to true, which
        // prevents any user initiated zoom changes from being registered.
        // Unsetting the flag after the map settles seems to be the best way to
        // avoid this.
        zoomChangedProgrammatically = false
        onIdle?.(getCurrentMapState())
      })
    )
    // The events get re-added each time a dependency changes in this useEffect,
    // so we have to clean them up, otherwise they will multiply quickly and
    // cause many unecessary api requests.
    return () => {
      eventListeners.forEach((eventListener) =>
        google.maps.event.removeListener(eventListener)
      )
      eventListeners.length = 0
    }
  }, [getCurrentMapState, googleMap, onDragEnd, onIdle, onUserChangedZoom])

  return (
    <div ref={mapEl} id={styles.googleMap}>
      {googleMap && children}
    </div>
  )
}

export default GoogleMap
