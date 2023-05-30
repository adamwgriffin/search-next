import type { NextPage } from 'next'
import type { Listing } from '../../../lib/types/listing_types'
import css from 'styled-jsx/css'
import ListingMainImage from '../ListingMainImage/ListingMainImage'
import FavoriteButton from '../FavoriteButton/FavoriteButton'

export interface ListingCardImageProps {
  listing: Listing
}

const ListingCardImage: NextPage<ListingCardImageProps> = ({ listing }) => {
  return (
    <div className='listingCardImage'>
      <div className='favoriteButtonContainer'>
        <FavoriteButton />
      </div>
      <ListingMainImage
        image={listing.photoGallery[0]}
        latitude={listing.latitude}
        longitude={listing.longitude}
        size='small'
        className={className}
      />
      <style jsx>{listingCardImageStyles}</style>
      {listingMainImageStyles}
    </div>
  )
}

const listingCardImageStyles = css`
  .listingCardImage {
    position: relative;
  }

  .favoriteButtonContainer {
    position: absolute;
    right: 0;
    margin: .5rem;
  }
`

const { className, styles: listingMainImageStyles } = css.resolve`
  img {
    object-fit: cover;
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 0.8rem;
  }
`

export default ListingCardImage
