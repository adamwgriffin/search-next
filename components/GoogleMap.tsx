import { useRef, useState, useEffect } from 'react'
import type { NextPage } from 'next'

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
    <>
      <div ref={mapEl} id="google-map"></div>

      <style jsx>{`
        #google-map {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  )
}

export default GoogleMap

