import type { NextPage } from 'next'
import GoogleMapsProvider from '../../context/google_maps_context'
import SearchLayout from '../SearchLayout/SearchLayout'

const Search: NextPage = () => {
  return (
    <GoogleMapsProvider>
      <SearchLayout />
    </GoogleMapsProvider>
  )
}

export default Search
