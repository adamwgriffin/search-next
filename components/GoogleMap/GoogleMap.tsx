import { useRef, useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { googleMap, setMap } from '../../lib/google'
import styles from './GoogleMap.module.css'

declare global {
  interface Window { google: any; }
}

interface Props {
  options: google.maps.MapOptions;
}

const GoogleMap: NextPage<Props> = ({ options }) => {
  const mapEl = useRef(null)

  useEffect(() => {
    if (!googleMap && mapEl.current !== null) {
      setMap(mapEl.current, options)
    }
  })

  return (
    <div ref={mapEl} id={styles.googleMap}></div>
  )
}

export default GoogleMap
