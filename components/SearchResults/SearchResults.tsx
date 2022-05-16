import type { NextPage } from "next"
import styles from './SearchResults.module.css'
import ListingCard from '../listings/ListingCard/ListingCard'

const SearchResults: NextPage = () => {
  return (  
    <ul className={styles.searchResultsList}>
      <li><ListingCard /></li>
      <li><ListingCard /></li>
      <li><ListingCard /></li>
      <li><ListingCard /></li>
      <li><ListingCard /></li>
      <li><ListingCard /></li>
      <li><ListingCard /></li>
      <li><ListingCard /></li>
    </ul>
  )
}

export default SearchResults
