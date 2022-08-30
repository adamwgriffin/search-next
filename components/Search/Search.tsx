import { useState, useEffect } from "react"
import { loadGoogle } from '../../lib/google'
import type { NextPage } from 'next'
import Header from '../Header/Header'
import Filters from '../form/Filters/Filters'
import SearchResults from '../SearchResults/SearchResults'
import ListingMap from '../map/ListingMap/ListingMap'
import styles from './Search.module.css'

const Search: NextPage = () => {
  const [googleLoaded, setGoogleLoaded] = useState(false)

  useEffect(() => {
    const initializeGoogleMaps = async () => {
      await loadGoogle()
      setGoogleLoaded(true)
    }
    initializeGoogleMaps().catch(error => console.error("Unable to load Google Maps API", error))
  }, [])

  const searchLayout = () => {
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

  // we wait to render the content in the view that depends on the google maps api until the api is loaded, that way the
  // "google" variable will be defined for any of the components need to create instances of google maps classes, e.g.,
  // `new google.maps.Map()`
  return googleLoaded ? searchLayout() : null
}

export default Search
