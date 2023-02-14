import type { NextPage } from 'next'
import type { ListingLocation } from '../../../../lib/types/listing_types'
import css from 'styled-jsx/css'
import { cityStateZip } from '../../../../lib/listing_helpers'

export interface ListingMainImageProps {
  location: ListingLocation
}

const ListingMainImage: NextPage<ListingMainImageProps> = ({ location }) => {
  return (
    <>
      <address className='address'>
        <div className='addressLine1'>
          {location.address}
        </div>
        <div className='addressLine2'>
          {cityStateZip(location)}
        </div>
      </address>
      <style jsx>{styles}</style>
    </>
  )
}

const styles = css`
  .address {
    font-style: normal;
  }

  .addressLine1 {
    font-size: 1.5rem;
  }
`

export default ListingMainImage
