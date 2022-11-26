import type { NextPage } from 'next'
import { useEffect } from 'react'
import {
  getListingDetail,
  selectListing
} from '../../store/listingDetail/listingDetailSlice'
import { useAppSelector, useAppDispatch } from '../../hooks'
import {
  formatPrice,
  getBathrooms,
  formatSqft,
  cityStateZip
} from '../../lib/helpers/listing_helpers'
import styles from './ListingDetail.module.css'

export interface ListingDetailProps {
  // listing_id is type string | string[] because of catch all routes
  listingID: string | string[] | undefined
}

const ListingDetail: NextPage<ListingDetailProps> = ({ listingID }) => {
  const dispatch = useAppDispatch()
  const listing = useAppSelector(selectListing)

  useEffect(() => {
    listingID && dispatch(getListingDetail(listingID))
  }, [listingID])

  return (
    <div>
      <header className={styles.header}>Header</header>
      {listing && (
        <div className={styles.listingDetail}>
          <div className={styles.gallery}>
            <img
              className={styles.galleryImage}
              src={listing.images[0].gallery_url}
              alt='Listing image'
            />
          </div>

          <div className={styles.price}>
            {formatPrice(listing)}
          </div>

          <address className={styles.address}>
            <div className={styles.addressLine1}>
              {listing.location.address}
            </div>
            <div className={styles.addressLine2}>
              {cityStateZip(listing.location)}
            </div>
          </address>

          <div className={styles.stats}>
            <div className={styles.beds}>{listing.bedrooms}bd</div>
            <div className={styles.baths}>{getBathrooms(listing)}ba</div>
            <div className={styles.size}>{formatSqft(listing)} sqft</div>
          </div>

          <div className={styles.description}>
            <h4>Description</h4>
            <p>{listing.comments}</p>
          </div>

        </div>
      )}
    </div>
  )
}

export default ListingDetail
