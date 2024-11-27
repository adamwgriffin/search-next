import type { ListingDetail } from '../../../types/listing_types'
import ListingImageContainer from '../ListingImageContainer/ListingImageContainer'
import ListingImageContainerElements from '../ListingImageContainerElements/ListingImageContainerElements'
import FavoriteButton from '../../../containers/FavoriteButton/FavoriteButton'
import ListingDetailMainImage from './ListingDetailMainImage/ListingDetailMainImage'

export type ListingDetailImageProps = {
  listing: ListingDetail
  onClick?: () => void
}

const ListingDetailImage: React.FC<ListingDetailImageProps> = ({
  listing,
  onClick
}) => {
  return (
    <ListingImageContainer>
      <ListingImageContainerElements>
        <FavoriteButton listingId={listing._id} />
      </ListingImageContainerElements>
      <ListingDetailMainImage
        imageUrl={listing.photoGallery?.[0]?.url}
        streetViewLat={listing.latitude}
        streetViewLng={listing.longitude}
        onClick={onClick}
      />
    </ListingImageContainer>
  )
}

export default ListingDetailImage
