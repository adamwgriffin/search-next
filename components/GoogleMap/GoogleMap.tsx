import { useRef, useEffect, ReactNode } from 'react'
import type { NextPage } from 'next'
import { googleMap, setMap } from '../../lib/google'
import styles from './GoogleMap.module.css'

declare global {
  interface Window {
    google: any
  }
}

export interface GoogleMapProps {
  options: google.maps.MapOptions
  children: ReactNode
}

const GoogleMap: NextPage<GoogleMapProps> = ({ options, children }) => {
  const mapEl = useRef(null)

  useEffect(() => {
    if (!googleMap && mapEl.current !== null) {
      setMap(mapEl.current, options)
    }
  }, [])

  return (
    <div ref={mapEl} id={styles.googleMap}>
      {children}
    </div>
  )
}

export default GoogleMap
