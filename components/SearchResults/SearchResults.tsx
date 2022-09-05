import type { NextPage } from 'next'
import type { Listing } from '../../lib/types'
import styles from './SearchResults.module.css'
import ListingCard from '../listings/ListingCard/ListingCard'

export interface SearchResultsProps {
  listings: Listing[]
}

const SearchResults: NextPage<SearchResultsProps> = ({ listings=[] }) => {
  
  return (  
    <ul className={styles.searchResultsList}>
      {listings.map((listing) => (
        <li key={listing.listingid.toString()}>
          <ListingCard listing={listing} />
        </li>
      ))}
    </ul>
  )
}

export default SearchResults
