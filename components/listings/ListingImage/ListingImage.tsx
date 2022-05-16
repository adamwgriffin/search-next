import type { NextPage } from 'next'
import styles from './ListingImage.module.css'

const ListingImage: NextPage = () => {
  return (
    <div>
      <img
        className={styles.listingImage}
        src="https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/dc98e1384e388ff54c9cf672bf46a3e1-full.webp"
      ></img>
    </div>
  )
}

export default ListingImage
