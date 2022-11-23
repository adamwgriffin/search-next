import type { NextPage } from 'next'
import Image from 'next/image'
import type { Listing } from '../../../lib/types'
import styles from './ListingCardImage.module.css'

export interface ListingCardImageProps {
  listing: Listing
}

const ListingCardImage: NextPage<ListingCardImageProps> = ({ listing }) => {
  return (
    <div>
      <Image
        className={styles.listingImage}
        src={listing.image[0].small_url}
        alt="Listing image"
      />
    </div>
  )
}

export default ListingCardImage
