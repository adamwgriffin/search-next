import type { NextPage } from 'next'
import type { ListingDetail } from '../../../../types/listing_types'
import { useMedia } from 'react-use'
import ListingImageContainer from '../../ListingImageContainer/ListingImageContainer'
import ListingImageContainerElements from '../../ListingImageContainerElements/ListingImageContainerElements'
import ListingMainImage from '../../ListingMainImage/ListingMainImage'
import FavoriteButton from '../../../../containers/FavoriteButton/FavoriteButton'

export interface ListingDetailImageProps {
  listing: ListingDetail
  onClick?: () => void
}

const ListingDetailImage: NextPage<ListingDetailImageProps> = ({
  listing,
  onClick
}) => {
  const isSmallAndUp = useMedia('(min-width: 576px)', false)

  return (
    <ListingImageContainer>
      <ListingImageContainerElements>
        <FavoriteButton listingId={listing._id} />
      </ListingImageContainerElements>
      <ListingMainImage
        image={listing?.photoGallery?.[0]}
        latitude={listing.latitude}
        longitude={listing.longitude}
        size='full'
        style={{
          objectFit: 'cover',
          cursor: 'pointer',
          width: '100%',
          height: isSmallAndUp ? '30rem' : '20rem',
          borderRadius: '0.5rem'
        }}
        onClick={onClick}
      />
    </ListingImageContainer>
  )
}

export default ListingDetailImage
