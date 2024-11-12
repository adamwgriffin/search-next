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
import LoginOrRegisterModal from '../../../containers/modals/LoginOrRegisterModal/LoginOrRegisterModal'

const ListingPage: NextPage = () => {
  useGetCurrentUserIfAuthenticated()
  const params = useParams()
  const dispatch = useAppDispatch()
  const listing = useAppSelector(selectListing)

  useEffect(() => {
    if (!listing && typeof params?.listing_id === 'string') {
      dispatch(getListingDetail(params.listing_id))
    }
  }, [params?.listing_id, dispatch, listing])

  return (
    <>
      <GoogleMapsProvider>
        <ListingDetailHeader />
        <div className='listingDetailPage'>
          {/* TODO: add a ContentLoader component for when the listing is still loading and using it with <Suspense> */}
          {listing && <ListingDetail listing={listing} />}
        </div>
        <LoginOrRegisterModal />
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
