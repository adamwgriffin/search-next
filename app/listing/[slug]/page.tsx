'use client'

import type { ListingDetailParams } from '../../api/listing_detail/[slug]/route'
import { useEffect } from 'react'
import { useParams } from 'next/navigation'
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

const ListingPage: React.FC = () => {
  useGetCurrentUserIfAuthenticated()
  const params = useParams<ListingDetailParams>()
  const dispatch = useAppDispatch()
  const listing = useAppSelector(selectListing)

  useEffect(() => {
    if (!listing && typeof params?.slug === 'string') {
      dispatch(getListingDetail(params.slug))
    }
  }, [params?.slug, dispatch, listing])

  return (
    <GoogleMapsProvider libraries={['places']}>
      <ListingDetailHeader />
      {listing && <ListingDetail listing={listing} />}
      <LoginOrRegisterModal />
    </GoogleMapsProvider>
  )
}

export default ListingPage
