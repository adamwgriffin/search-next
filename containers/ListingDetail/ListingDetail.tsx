import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import css from 'styled-jsx/css'
import {
  getListingDetail,
  selectListing
} from '../../store/listingDetail/listingDetailSlice'
import { useAppSelector, useAppDispatch } from '../../hooks'
import GoogleMapsProvider from '../../context/google_maps_context'
import { AppGoogleMapsLoaderOptions } from '../../config/googleMapsOptions'
import { formatPrice } from '../../lib/helpers/listing_helpers'
import ListingStatusIndicator from '../../components/listings/ListingStatusIndicator/ListingStatusIndicator'
import ListingDetailImage from '../../components/listings/listing_detail/ListingDetailImage/ListingDetailImage'
import ListingDetailAddress from '../../components/listings/listing_detail/ListingDetailAddress/ListingDetailAddress'
import ListingDetailBedsBathsSQFT from '../../components/listings/listing_detail/ListingDetailBedsBathsSQFT/ListingDetailBedsBathsSQFT'
import Description from '../../components/listings/listing_detail/Description/Description'
import PropertyDetails from '../../components/listings/listing_detail/PropertyDetails/PropertyDetails'
import SlideShow from '../../components/listings/listing_detail/SlideShow/SlideShow'

export interface ListingDetailProps {
  // listing_id is type string | string[] because of catch all routes
  listingID: string | string[] | undefined
}

const ListingDetail: NextPage<ListingDetailProps> = ({ listingID }) => {
  const dispatch = useAppDispatch()
  const listing = useAppSelector(selectListing)
  const [slideShowOpen, setSlideShowOpen] = useState(false)

  useEffect(() => {
    listingID && dispatch(getListingDetail(listingID))
  }, [listingID, dispatch])

  return (
    <GoogleMapsProvider loaderOptions={AppGoogleMapsLoaderOptions}>
      <div>
        {/* <header className={styles.header}>Header</header> */}
        {listing && (
          <div className='listingDetail'>
            <div className='status'>
              <ListingStatusIndicator
                propertyStatusID={listing.pstatus_id}
                name={listing.status_name_for_view}
              />
            </div>
            <ListingDetailImage
              images={listing.images}
              location={listing.location}
              onClick={() => setSlideShowOpen(true)}
            />
            <div className='price'>{formatPrice(listing)}</div>
            <div className='neighborhood'>{listing.neighborhood}</div>
            <ListingDetailAddress location={listing.location} />
            <ListingDetailBedsBathsSQFT listing={listing} />
            <Description comments={listing.comments} />
            <PropertyDetails listing={listing} />
            <SlideShow
              open={slideShowOpen}
              onClose={() => setSlideShowOpen(false)}
              images={listing.images}
            />
          </div>
        )}
        <style jsx>{styles}</style>
      </div>
    </GoogleMapsProvider>
  )
}

const styles = css`
  .header {
    height: 3rem;
    padding-top: 0.5rem;
    border-bottom: 1px solid #cccccc;
  }

  .listingDetail {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    margin: 0 auto;
    width: 50rem;
    padding: 1rem 0 2rem 0;
  }

  .price {
    font-size: 2rem;
    font-weight: 600;
  }

  .neighborhood {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 0.3rem;
  }
`

export default ListingDetail
