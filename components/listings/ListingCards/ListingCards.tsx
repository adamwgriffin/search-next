import type { NextPage } from 'next'
import type { Listing } from '../../../lib/types/listing_types'
import styles from './ListingCards.module.css'
import ListingCard from '../ListingCard/ListingCard'
import ListingCardLoader from '../ListingCardLoader/ListingCardLoader'

export interface ListingCardProps {
  listings: Listing[]
  listingSearchRunning: boolean
  onListingCardClick: (url: string, listingId: number) => void
  onListingCardMouseEnter?: (listingId: number) => void
  onListingCardMouseLeave?: (listingId: number) => void
}

const ListingCards: NextPage<ListingCardProps> = ({
  listings,
  listingSearchRunning,
  onListingCardClick,
  onListingCardMouseEnter,
  onListingCardMouseLeave
}) => {
  return (
    <ul className={styles.listingCards}>
      {!listingSearchRunning &&
        listings.map((listing) => (
          <li key={listing._id.toString()}>
            <ListingCard
              listing={listing}
              url={`listing/${listing._id}`}
              onClick={() =>
                onListingCardClick(
                  `listing/${listing._id}`,
                  listing._id
                )
              }
              onMouseEnter={() => onListingCardMouseEnter?.(listing._id)}
              onMouseLeave={() => onListingCardMouseLeave?.(listing._id)}
            />
          </li>
        ))}

      {listingSearchRunning &&
        [...Array(6)].map((_, i) => (
          <li key={i}>
            <ListingCardLoader />
          </li>
        ))}
    </ul>
  )
}

export default ListingCards
