import type { NextPage } from 'next'
import { useEffect } from 'react'
import {
  getListingDetail,
  selectListing
} from '../../store/listingDetail/listingDetailSlice'
import { useAppSelector, useAppDispatch } from '../../hooks'
import GoogleMapsProvider from '../../context/google_maps_context'
import { AppGoogleMapsLoaderOptions } from '../../config/googleMapsOptions'
import {
  formatPrice,
  getBathrooms,
  formatSqft,
  cityStateZip
} from '../../lib/helpers/listing_helpers'
import styles from './ListingDetail.module.css'
import ListingMainImage from '../../components/listings/ListingMainImage/ListingMainImage'

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
    <GoogleMapsProvider loaderOptions={AppGoogleMapsLoaderOptions}>
      <div>
        {/* <header className={styles.header}>Header</header> */}
        {listing && (
          <div className={styles.listingDetail}>

            <div className={listing.pstatus_id === 1 ? styles.statusActive : styles.status}>
              {listing.status_name_for_view}
            </div>

            <div className={styles.gallery}>
              <ListingMainImage
                image={listing.images[0]}
                location={listing.location}
                size='full'
                style={{
                  objectFit: 'cover',
                  cursor: 'pointer',
                  width: '100%',
                  height: '30rem',
                  borderRadius: '0.5rem'
                }}
              />
            </div>

            <div className={styles.price}>{formatPrice(listing)}</div>

            <div title='Neighborhood' className={styles.neighborhood}>
              {listing.neighborhood}
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
              <div className={styles.beds}>{listing.bedrooms} Bed</div>
              <div className={styles.baths}>{getBathrooms(listing)} Bath</div>
              <div className={styles.size}>{formatSqft(listing)} sqft</div>
            </div>

            <div className={styles.description}>
              <h4 className={styles.heading}>Description</h4>
              <p>{listing.comments}</p>
            </div>

            <div className={styles.details}>
              <h4 className={styles.heading}>Property Details</h4>
              <ul className={styles.detailsList}>
                <li>
                  <div className={styles.detailsName}>Property Type</div>
                  <div>{listing.property_type}</div>
                </li>
                <li>
                  <div className={styles.detailsName}>Time on Site</div>
                  <div>{`${listing.days_on_market.toLocaleString()} ${
                    listing.days_on_market > 1 ? 'days' : 'day'
                  }`}</div>
                </li>
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
          </div>
        )}
      </div>
    </GoogleMapsProvider>
  )
}

export default ListingDetail
