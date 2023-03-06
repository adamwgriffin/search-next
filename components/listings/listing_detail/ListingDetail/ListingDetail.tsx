import type { NextPage } from 'next'
import { useState } from 'react'
import type { ListingDetailListing } from '../../../../lib/types/listing_types'
import css from 'styled-jsx/css'
import { formatPrice } from '../../../../lib/listing_helpers'
import ListingStatusIndicator from '../../ListingStatusIndicator/ListingStatusIndicator'
import ListingDetailImage from '../ListingDetailImage/ListingDetailImage'
import ListingDetailAddress from '../ListingDetailAddress/ListingDetailAddress'
import ListingDetailBedsBathsSQFT from '../ListingDetailBedsBathsSQFT/ListingDetailBedsBathsSQFT'
import Description from '../Description/Description'
import HomeHighlights from '../Highlights/HomeHighlights'
import PropertyDetails from '../PropertyDetails/PropertyDetails'
import SlideShow from '../SlideShow/SlideShow'

export interface ListingDetailProps {
  listing: ListingDetailListing
}

const ListingDetail: NextPage<ListingDetailProps> = ({ listing }) => {
  const [slideShowOpen, setSlideShowOpen] = useState(false)

  return (
    <>
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
        <HomeHighlights listing={listing} />
        <PropertyDetails features={listing.features} />
        <SlideShow
          open={slideShowOpen}
          onClose={() => setSlideShowOpen(false)}
          images={listing.images}
        />
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

const styles = css`
  .listingDetail {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
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
