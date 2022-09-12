import type { NextPage } from 'next'
import styles from './SearchResults.module.css'
import ListingCard from '../../components/listings/ListingCard/ListingCard'
import { useAppSelector } from '../../hooks'
import { selectListings } from '../../store/listingSearch/listingSearchSlice'

const SearchResults: NextPage = () => {
  const listings = useAppSelector(selectListings)

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
