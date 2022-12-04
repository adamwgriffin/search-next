import type { NextPage } from 'next'
import type { Listing } from '../../../lib/types'
import ListingMainImage from '../ListingMainImage/ListingMainImage'

export interface ListingCardImageProps {
  listing: Listing
}

const ListingCardImage: NextPage<ListingCardImageProps> = ({ listing }) => {
  return (
    <ListingMainImage
      image={listing.image[0]}
      location={listing.location}
      size='small'
      style={{
        objectFit: 'cover',
        width: '100%',
        height: '13rem',
        borderTopLeftRadius: '0.5rem',
        borderTopRightRadius: '0.5rem'
      }}
    />
  )
}

export default ListingCardImage
