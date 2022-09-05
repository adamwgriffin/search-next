import type { NextPage } from 'next'
import type { Listing } from '../../../lib/types'
import styles from './ListingCardImage.module.css'

export interface ListingCardImageProps {
  listing: Listing
}

const ListingCardImage: NextPage<ListingCardImageProps> = ({ listing }) => {
  return (
    <div>
      <img
        className={styles.listingImage}
        src={listing.image[0].small_url}
      ></img>
    </div>
  )
}

export default ListingCardImage
