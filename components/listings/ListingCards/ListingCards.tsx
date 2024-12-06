import type { NextPage } from 'next'
import type { Listing } from '../../../types/listing_types'
import styles from './ListingCards.module.css'
import ListingCard from '../ListingCard/ListingCard'
import ListingCardLoader from '../ListingCardLoader/ListingCardLoader'

export interface ListingCardProps {
  listings: Listing[]
  listingSearchRunning: boolean
  onListingCardClick: (url: string, listingId: string) => void
  onListingCardMouseEnter?: (listingId: string) => void
  onListingCardMouseLeave?: (listingId: string) => void
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
          <li key={listing._id}>
            <ListingCard
              listing={listing}
              url={`/listing/${listing._id}`}
              onClick={() =>
                onListingCardClick(`/listing/${listing._id}`, listing._id)
              }
              onMouseEnter={() => onListingCardMouseEnter?.(listing._id)}
              onMouseLeave={() => onListingCardMouseLeave?.(listing._id)}
            />
          </li>
        ))}

      {listingSearchRunning && (
        <>
          <li>
            <ListingCardLoader />
          </li>
          <li>
            <ListingCardLoader />
          </li>
          <li>
            <ListingCardLoader />
          </li>
          <li>
            <ListingCardLoader />
          </li>
          <li>
            <ListingCardLoader />
          </li>
          <li>
            <ListingCardLoader />
          </li>
          <li>
            <ListingCardLoader />
          </li>
        </>
      )}
    </ul>
  )
}

export default ListingCards
