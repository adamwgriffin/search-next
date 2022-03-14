import { useState, useEffect } from "react"
import { loadGoogle } from '../../lib/google'
import type { NextPage } from 'next'
import Filters from '../form/Filters/Filters'
import ListingMap from '../ListingMap'
import styles from './Search.module.css'

const defaultLocations = [
  {
    position: {
      lat: 48.160910,
      lng: 16.383330,
    },
  },
  {
    position: {
      lat: 48.174270,
      lng: 16.329620,
    },
  },
  // prague
  {
    position: {
      lat: 50.075,
      lng: 14.4378,
    },
  },
  // budapest
  {
    position: {
      lat: 47.4979,
      lng: 19.0402,
    },
  }
]

const initializeGoogleMaps = async (setGoogleLoaded: Function) => {
  // we wait to render the content in the view that depends on the google maps api until the api is loaded, that way the
  // "google" variable will be defined for any of the components need to create instances of google maps classes, e.g.,
  // `new google.maps.Map()`
  try {
    await loadGoogle()
    setGoogleLoaded(true)
  } catch (error) {
    console.error("Unable to load Google Maps API", error)
  }
}

const searchTemplate = () => {
  return (
    <div id={styles.search}>
      <Filters />
      <div className={styles.resultsAndMap}>
        <div className={styles.searchResults}>
          <ul>
            <li>Listing 1</li>
            <li>Listing 2</li>
            <li>Listing 3</li>
            <li>Listing 4</li>
          </ul>
        </div>
        <ListingMap />
      </div>
    </div>
  )
}

const Search: NextPage = () => {
  const [googleLoaded, setGoogleLoaded] = useState(false)
  const [locations, setLocations] = useState(defaultLocations)

  useEffect(() => {
    initializeGoogleMaps(setGoogleLoaded)
  })

  return googleLoaded ? searchTemplate() : null
}

export default Search
