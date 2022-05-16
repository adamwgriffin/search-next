import { useState, useEffect } from "react"
import { loadGoogle } from '../../lib/google'
import type { NextPage } from 'next'
import Header from '../Header/Header'
import Filters from '../form/Filters/Filters'
import SearchResults from '../SearchResults/SearchResults'
import ListingMap from '../ListingMap/ListingMap'
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
    <div className={styles.search}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.filters}>
        <Filters />
      </div>
      <div className={styles.searchResults}>
        <SearchResults />
      </div>
      <div className={styles.map}>
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
