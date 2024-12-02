import type { ListingDetail } from '../../../../types/listing_types'
import { useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import {
  formatPriceFromListing,
  formatSoldDate
} from '../../../../lib/listing_helpers'
import ListingStatusIndicator from '../../ListingStatusIndicator/ListingStatusIndicator'
import ListingDetailImage from '../ListingDetailImage'
import ListingDetailAddress from '../ListingDetailAddress/ListingDetailAddress'
import ListingDetailBedsBathsSQFT from '../ListingDetailBedsBathsSQFT/ListingDetailBedsBathsSQFT'
import Description from '../Description/Description'
import HomeHighlights from '../Highlights/HomeHighlights'
import PropertyDetails from '../PropertyDetails/PropertyDetails'
import SlideShow from '../SlideShow/SlideShow'
import OpenHouseList from '../OpenHouseList/OpenHouseList'
import styles from './ListingDetail.module.css'

export type ListingDetailProps = {
  listing: ListingDetail
}

const ListingDetail: React.FC<ListingDetailProps> = ({ listing }) => {
  const [slideShowOpen, setSlideShowOpen] = useState(false)

  const openSlideShow = useCallback((open: boolean) => {
    document.body.style.overflow = open ? 'hidden' : ''
    setSlideShowOpen(open)
  }, [])

  return (
    <div className={styles.listingDetail}>
      <div className={styles.status}>
        <ListingStatusIndicator status={listing.status} />
        {listing.soldDate && formatSoldDate(listing.soldDate)}
      </div>
      <ListingDetailImage
        listing={listing}
        onClick={() => openSlideShow(true)}
      />
      <div className={styles.price}>
        {formatPriceFromListing(listing, { displayInterval: true })}
      </div>
      <div className={styles.neighborhood}>{listing.neighborhood}</div>
      <ListingDetailAddress address={listing.address} />
      <ListingDetailBedsBathsSQFT listing={listing} />
      <Description description={listing.description} />
      {listing.openHouses.length && (
        <OpenHouseList openHouses={listing.openHouses} />
      )}
      <HomeHighlights listing={listing} />
      {listing.propertyDetails && (
        <PropertyDetails propertyDetails={listing.propertyDetails} />
      )}
      {createPortal(
        <SlideShow
          open={slideShowOpen}
          onClose={() => openSlideShow(false)}
          images={listing.photoGallery || []}
        />,
        document.body
      )}
    </div>
  )
}

export default ListingDetail
