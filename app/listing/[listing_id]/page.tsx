'use client'

import type { NextPage } from 'next'
import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import css from 'styled-jsx/css'
import { useAppSelector, useAppDispatch } from '../../../hooks/app_hooks'
import { useGetCurrentUserIfAuthenticated } from '../../../hooks/get_current_user_if_authenticated_hook'
import {
  getListingDetail,
  selectListing
} from '../../../store/listingDetail/listingDetailSlice'
import GoogleMapsProvider from '../../../providers/GoogleMapsProvider'
import ListingDetailHeader from '../../../containers/ListingDetailHeader/ListingDetailHeader'
import ListingDetail from '../../../components/listings/listing_detail/ListingDetail/ListingDetail'

const ListingPage: NextPage = () => {
  useGetCurrentUserIfAuthenticated()
  const params = useParams()
  const dispatch = useAppDispatch()
  const listing = useAppSelector(selectListing)

  useEffect(() => {
    if (
      typeof params?.listing_id === 'string' &&
      params.listing_id.length > 0
    ) {
      dispatch(getListingDetail(params.listing_id))
    }
  }, [params?.listing_id, dispatch])

  return (
    <>
      <GoogleMapsProvider>
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
