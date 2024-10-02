import type { NextPage } from 'next'
import type { ListingAddress } from '../../../../types/listing_types'
import css from 'styled-jsx/css'
import { cityStateZip } from '../../../../lib/listing_helpers'

export interface ListingMainImageProps {
  address: ListingAddress
}

const ListingMainImage: NextPage<ListingMainImageProps> = ({ address }) => {
  return (
    <>
      <address className='address'>
        <div className='addressLine1'>
          {address.line1}
        </div>
        <div className='addressLine2'>
          {cityStateZip(address)}
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
