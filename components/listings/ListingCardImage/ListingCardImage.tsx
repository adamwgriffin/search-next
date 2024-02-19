import type { NextPage } from 'next'
import type { Listing } from '../../../lib/types/listing_types'
import ListingImageContainer from '../ListingImageContainer/ListingImageContainer'
import ListingImageContainerElements from '../ListingImageContainerElements/ListingImageContainerElements'
import ListingMainImage from '../ListingMainImage/ListingMainImage'
import FavoriteButton from '../../../containers/FavoriteButton/FavoriteButton'

export interface ListingCardImageProps {
  listing: Listing
}

const ListingCardImage: NextPage<ListingCardImageProps> = ({ listing }) => {
  return (
    <ListingImageContainer>
      <ListingImageContainerElements>
        <FavoriteButton listingId={listing._id} />
      </ListingImageContainerElements>
      <ListingMainImage
        image={listing.photoGallery[0]}
        latitude={listing.latitude}
        longitude={listing.longitude}
        size='small'
        style={{
          objectFit: 'cover',
          width: '100%',
          aspectRatio: '1 / 1',
          borderRadius: '0.8rem'
        }}
      />
    </ListingImageContainer>
  )
}

export default ListingCardImage
