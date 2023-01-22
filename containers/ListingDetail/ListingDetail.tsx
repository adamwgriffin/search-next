import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
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
import ListingStatusIndicator from '../../components/listings/ListingStatusIndicator/ListingStatusIndicator'
import ListingMainImage from '../../components/listings/ListingMainImage/ListingMainImage'
import PhotoGallery from '../../components/listings/PhotoGallery/PhotoGallery'

export interface ListingDetailProps {
  // listing_id is type string | string[] because of catch all routes
  listingID: string | string[] | undefined
}

const ListingDetail: NextPage<ListingDetailProps> = ({ listingID }) => {
  const dispatch = useAppDispatch()
  const listing = useAppSelector(selectListing)
  const [photoGalleryOpen, setPhotoGalleryOpen] = useState(false)

  useEffect(() => {
    listingID && dispatch(getListingDetail(listingID))
  }, [listingID, dispatch])

  return (
    <GoogleMapsProvider loaderOptions={AppGoogleMapsLoaderOptions}>
      <div>
        {/* <header className={styles.header}>Header</header> */}
        {listing && (
          <div className={styles.listingDetail}>
            <div className={styles.status}>
              <ListingStatusIndicator
                propertyStatusID={listing.pstatus_id}
                name={listing.status_name_for_view}
              />
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
                onClick={() => setPhotoGalleryOpen(true)}
              />
            </div>

            <div className={styles.price}>{formatPrice(listing)}</div>

            <div className={styles.neighborhood}>{listing.neighborhood}</div>

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

            <div>
              <h4 className={styles.heading}>Description</h4>
              <p className={styles.comments}>{listing.comments}</p>
            </div>

            <div>
              <h4 className={styles.heading}>Property Details</h4>
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

            <PhotoGallery
              open={photoGalleryOpen}
              onClose={() => setPhotoGalleryOpen(false)}
              images={listing.images}
            />
          </div>
        )}
      </div>
    </GoogleMapsProvider>
  )
}

export default ListingDetail
