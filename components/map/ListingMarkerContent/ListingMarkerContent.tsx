import type { NextPage } from 'next'
import styles from './ListingMarkerContent.module.css'
import Link from 'next/link'

export interface ListingMarkerContentProps {
  price: string
  link: string
}

const ListingMarkerContent: NextPage<ListingMarkerContentProps> = ({
  price,
  link
}) => {
  return (
    <Link
      href={link}
      className={styles.link}
    >
      <div
        className={styles.listingMarker}
      >
        {price}
      </div>
    </Link>
  )
}

export default ListingMarkerContent
