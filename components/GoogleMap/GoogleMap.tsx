import { useRef, useState, useEffect } from 'react'
import type { NextPage } from 'next'
import styles from './GoogleMap.module.css'

declare global {
  interface Window { google: any; }
}

interface Props {
  options: google.maps.MapOptions;
}

const GoogleMap: NextPage<Props> = ({ options }) => {
  const [map, setMap] = useState(null)
  const mapEl = useRef(null)

  useEffect(() => {
    if (!map) setMap(new window.google.maps.Map(mapEl.current, options))
  })

  return (
    <div ref={mapEl} id={styles.googleMap}></div>
  )
}

export default GoogleMap

