'use client'

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
  const params = useParams()
  const dispatch = useAppDispatch()
  const listing = useAppSelector(selectListing)

  useEffect(() => {
    if (!listing && typeof params?.listing_id === 'string') {
      dispatch(getListingDetail(params.listing_id))
    }
  }, [params?.listing_id, dispatch, listing])

  return (
    <GoogleMapsProvider>
      <ListingDetailHeader />
      {listing && <ListingDetail listing={listing} />}
      <LoginOrRegisterModal />
    </GoogleMapsProvider>
  )
}

export default ListingPage
