import type { NextPage } from 'next'
import { useState } from 'react'
import type { IListingDetail } from '../../../../lib/types/listing_types'
import css from 'styled-jsx/css'
import { formatPriceFromListing } from '../../../../lib/listing_helpers'
import ListingStatusIndicator from '../../ListingStatusIndicator/ListingStatusIndicator'
import ListingDetailImage from '../ListingDetailImage/ListingDetailImage'
import ListingDetailAddress from '../ListingDetailAddress/ListingDetailAddress'
import ListingDetailBedsBathsSQFT from '../ListingDetailBedsBathsSQFT/ListingDetailBedsBathsSQFT'
import Description from '../Description/Description'
import HomeHighlights from '../Highlights/HomeHighlights'
import PropertyDetails from '../PropertyDetails/PropertyDetails'
import SlideShow from '../SlideShow/SlideShow'
import OpenHouseList from '../OpenHouseList/OpenHouseList'

export interface ListingDetailProps {
  listing: IListingDetail
}

const ListingDetail: NextPage<ListingDetailProps> = ({ listing }) => {
  const [slideShowOpen, setSlideShowOpen] = useState(false)

  return (
    <>
      <div className='listingDetail'>
        <div className='status'>
          <ListingStatusIndicator status={listing.status} />
        </div>
        <ListingDetailImage
          listing={listing}
          onClick={() => setSlideShowOpen(true)}
        />
        <div className='price'>{formatPriceFromListing(listing)}</div>
        <div className='neighborhood'>{listing.neighborhood}</div>
        <ListingDetailAddress address={listing.address} />
        <ListingDetailBedsBathsSQFT listing={listing} />
        <Description description={listing.description} />
        {listing.openHouses.length && <OpenHouseList openHouses={listing.openHouses} />}
        <HomeHighlights listing={listing} />
        <PropertyDetails propertyDetails={listing.propertyDetails} />
        <SlideShow
          open={slideShowOpen}
          onClose={() => setSlideShowOpen(false)}
          images={listing.photoGallery}
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
