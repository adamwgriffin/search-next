'use client'

import type { NextPage } from 'next'
import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import css from 'styled-jsx/css'
import { useAppSelector, useAppDispatch } from '../../../hooks'
import {
  getListingDetail,
  selectListing
} from '../../../store/listingDetail/listingDetailSlice'
import GoogleMapsProvider from '../../../context/google_maps_context'
import { AppGoogleMapsLoaderOptions } from '../../../config/googleMapsOptions'
import ListingDetailHeader from '../../../containers/ListingDetailHeader/ListingDetailHeader'
import ListingDetail from '../../../components/listings/listing_detail/ListingDetail/ListingDetail'

const ListingPage: NextPage = () => {
  const params = useParams()
  const dispatch = useAppDispatch()
  const listing = useAppSelector(selectListing)

  useEffect(() => {
    params?.listing_id &&
      dispatch(getListingDetail(params?.listing_id))
  }, [params?.listing_id, dispatch])

  return (
    <>
      <GoogleMapsProvider loaderOptions={AppGoogleMapsLoaderOptions}>
        <ListingDetailHeader />
        <div className='listingDetailPage'>
          {/* TODO: add a ContentLoader component for when the listing is still loading */}
          {listing && <ListingDetail listing={listing} />}
        </div>
      </GoogleMapsProvider>
      <style jsx>{styles}</style>
    </>
  )
}

const styles = css`
  .listingDetailPage {
    max-width: 50rem;
    margin: 0 auto;
    padding: 1rem 1rem 2rem 1rem;
  }
`

export default ListingPage
