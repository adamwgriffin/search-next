'use client'

import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/app_hooks'
import { useListingCardClickHandler } from '../../hooks/listing_card_click_handler_hook'
import { useGetCurrentUserIfAuthenticated } from '../../hooks/get_current_user_if_authenticated_hook'
import {
  getFavoriteListings,
  selectFavoriteListings,
  selectGetFavoriteListingsLoading
} from '../../store/user/userSlice'
import ListingCards from '../../components/listings/ListingCards/ListingCards'

const FavoritesList: React.FC = () => {
  const dispatch = useAppDispatch()
  const favoriteListings = useAppSelector(selectFavoriteListings)
  const getFavoriteListingsLoading = useAppSelector(
    selectGetFavoriteListingsLoading
  )
  const currentUser = useGetCurrentUserIfAuthenticated()
  const handleListingCardClick = useListingCardClickHandler(false)

  useEffect(() => {
    if (currentUser?.favoriteIds) {
      dispatch(getFavoriteListings())
    }
  }, [dispatch, currentUser])

  return (
    <ListingCards
      listings={favoriteListings}
      listingSearchRunning={!currentUser || getFavoriteListingsLoading}
      onListingCardClick={handleListingCardClick}
    />
  )
}

export default FavoritesList
