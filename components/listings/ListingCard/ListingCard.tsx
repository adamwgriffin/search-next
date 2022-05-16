import type { NextPage } from 'next'
import styles from './ListingCard.module.css'
import ListingImage from '../ListingImage/ListingImage'

const ListingCard: NextPage = () => {
  return (
    <div className={styles.listingCard}>
      <ListingImage />
      <div className={styles.details}>
        <div className={styles.price}>
          $2,295,000
        </div>
        <div className={styles.stats}>
          <div className={styles.beds}>6bd</div>
          <div className={styles.baths}>3ba</div>
          <div className={styles.size}>3,090 sqft</div>
        </div>
        <div className={styles.address}>
          <div className={styles.addressLine1}>
            770-772 Treat Ave
          </div>
          <div className={styles.addressLine2}>
            San Francisco, CA 94110
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingCard
