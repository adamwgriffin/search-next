import type { NextPage } from 'next'
import type { ListingDetailListing } from '../../../../lib/types/listing_types'
import styles from './HomeHighlights.module.css'

export interface HomeHighlightsProps {
  listing: ListingDetailListing
}

const HomeHighlights: NextPage<HomeHighlightsProps> = ({
  listing
}) => {
  return (
      <div>
        <h4 className={styles.heading}>Home Highlights</h4>
        <ul className={styles.detailsList}>
          <li>
            <div className={styles.detailsName}>Property Type</div>
            <div>{listing.property_type}</div>
          </li>
          {listing.days_on_market && (
            <li>
              <div className={styles.detailsName}>Time on Site</div>
              <div>
                {`${listing.days_on_market.toLocaleString()} ${
                  listing.days_on_market > 1 ? 'days' : 'day'
                }`}
              </div>
            </li>
          )}
          <li>
            <div className={styles.detailsName}>Year Built</div>
            <div>{listing.year_build}</div>
          </li>
          <li>
            <div className={styles.detailsName}>MLS Number</div>
            <div>{listing.mlsnumber}</div>
          </li>
        </ul>
      </div>

  )
}

export default HomeHighlights
