import { useState, useEffect } from "react"
import { loadGoogle } from '../lib/google'
import type { NextPage } from 'next'
import ListingMap from '../containers/ListingMap'

// TODO: figure out how to add this to environment file per next.js docs
declare global {
  interface Window { google: any; }
}

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
    <>
      <div id="search">
        <div className="form-and-search-results">
        </div>
        <ListingMap />
      </div>

      <style jsx>{`
        #search {
          /* if html, body & parent are all height 100% & parent is display: flex, then #search will also be 100% wthout
          having to specify it's own height. display: flex in turn allows this element's child, .search-results to also
          have 100% height without specifying it. flex also causes the divs for each column to sit side-by-side */
          display: flex;
          /* width is necessary, otherwise the whole layout shrinks down */
          width: 100%;
        }

        .form-and-search-results {
          display: flex;
          flex-direction: column;
          width: 65%;
          background: #f6f6f6;
        }

        .listings-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 2rem;
        }
      `}</style>
    </>
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
