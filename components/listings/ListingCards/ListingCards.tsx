import type { NextPage } from 'next'
import type { Listing } from '../../../lib/types/listing_types'
import styles from './ListingCards.module.css'
import ListingCard from '../ListingCard/ListingCard'
import ListingCardLoader from '../ListingCardLoader/ListingCardLoader'

export interface ListingCardProps {
  listings: Listing[]
  listingSearchRunning: boolean
  handleListingCardClick: (url: string, listingId: number) => void
}

const ListingCards: NextPage<ListingCardProps> = ({
  listings,
  listingSearchRunning,
  handleListingCardClick
}) => {
  return (
    <ul className={styles.listingCards}>
      {!listingSearchRunning &&
        listings.map((listing) => (
          <li key={listing.listingid.toString()}>
            <ListingCard
              listing={listing}
              url={`listing/${listing.listingid}`}
              onClick={() =>
                handleListingCardClick(
                  `listing/${listing.listingid}`,
                  listing.listingid
                )
              }
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
