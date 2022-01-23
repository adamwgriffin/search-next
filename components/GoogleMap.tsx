import { useRef, useState, useEffect } from "react"
import type { NextPage } from 'next'

declare global {
  interface Window { google: any; }
}

// Props interface
// with options set to object
interface Props {
  options: object;
}

const GoogleMap: NextPage<Props> = (props) => {
  // using destructuring to get options
  const { options } = props;

  const [mapOptions, setMapOptions] = useState(options)
  const [map, setMap] = useState(null)
  const mapEl = useRef(null)

  useEffect(() => {
    if (!map) setMap(new window.google.maps.Map(mapEl.current, mapOptions))
  })

  return (
    <div ref={mapEl} id="google-map" style={{ width: '100%', height: '100vh'}}>
    </div>
  )
}

export default GoogleMap

