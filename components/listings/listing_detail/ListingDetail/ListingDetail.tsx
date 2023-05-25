import type { NextPage } from 'next'
import { useState } from 'react'
import type { IListingDetail } from '../../../../lib/types/listing_types'
import css from 'styled-jsx/css'
import { formatPrice } from '../../../../lib/listing_helpers'
import ListingStatusIndicator from '../../ListingStatusIndicator/ListingStatusIndicator'
import ListingDetailImage from '../ListingDetailImage/ListingDetailImage'
import ListingDetailAddress from '../ListingDetailAddress/ListingDetailAddress'
import ListingDetailBedsBathsSQFT from '../ListingDetailBedsBathsSQFT/ListingDetailBedsBathsSQFT'
import Description from '../Description/Description'
import HomeHighlights from '../Highlights/HomeHighlights'
// import PropertyDetails from '../PropertyDetails/PropertyDetails'
import SlideShow from '../SlideShow/SlideShow'

export interface ListingDetailProps {
  listing: IListingDetail
}

// TODO: replace this with real images once that work is done
const PlaceholderListingImages = [
  {
    title: 'NOIMAGE',
    raw_url: '',
    gallery_url: '',
    full_url: 'https://picsum.photos/id/693/5000/2327',
    small_url: '',
    thumb_url: ''
  }
]

const ListingDetail: NextPage<ListingDetailProps> = ({ listing }) => {
  const [slideShowOpen, setSlideShowOpen] = useState(false)

  // TODO: replace this with some ContentLoader components
  if (!listing)
    return (
      <>
        <div className='listingDetail'>Loading...</div>
        <style jsx>{styles}</style>
      </>
    )

  return (
    <>
      <div className='listingDetail'>
        <div className='status'>
          <ListingStatusIndicator status={listing.status} />
        </div>
        <ListingDetailImage
          images={PlaceholderListingImages}
          latitude={listing.latitude}
          longitude={listing.longitude}
          onClick={() => setSlideShowOpen(true)}
        />
        <div className='price'>{formatPrice(listing)}</div>
        <div className='neighborhood'>{listing.neighborhood}</div>
        <ListingDetailAddress address={listing.address} />
        <ListingDetailBedsBathsSQFT listing={listing} />
        <Description description={listing.description} />
        <HomeHighlights listing={listing} />
        {/* TODO: add property details once they are done in the service */}
        {/* <PropertyDetails features={listing.features} /> */}
        <SlideShow
          open={slideShowOpen}
          onClose={() => setSlideShowOpen(false)}
          images={PlaceholderListingImages}
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
