import type { NextPage } from 'next'
import type { ListingDetailListing } from '../../../../lib/types/listing_types'
import css from 'styled-jsx/css'
import {
  getBathrooms,
  formatSqft
} from '../../../../lib/listing_helpers'

export interface ListingDetailBedsBathsSQFTProps {
  listing: ListingDetailListing
}

const ListingDetailBedsBathsSQFT: NextPage<ListingDetailBedsBathsSQFTProps> = ({
  listing
}) => {
  return (
    <>
      <div className='listingDetailBedsBathsSqft'>
        <div>{listing.bedrooms} Bed</div>
        <div>{getBathrooms(listing)} Bath</div>
        <div>{formatSqft(listing)} sqft</div>
      </div>
      <style jsx>{styles}</style>
    </>
  )
}

const styles = css`
  .listingDetailBedsBathsSqft {
    display: flex;
    column-gap: 0.5rem;
  }
`

export default ListingDetailBedsBathsSQFT
