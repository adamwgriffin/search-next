'use client'

import { useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { useListingCardClickHandler } from '../../hooks'
import {
  getCurrentUser,
  getFavoriteListings,
  selectCurrentUser,
  selectFavoriteListings,
  selectGetFavoriteListingsLoading
} from '../../store/user/userSlice'
import ListingCards from '../../components/listings/ListingCards/ListingCards'

const FavoritesList: React.FC = () => {
  const { status } = useSession()
  const dispatch = useAppDispatch()
  const favoriteListings = useAppSelector(selectFavoriteListings)
  const getFavoriteListingsLoading = useAppSelector(
    selectGetFavoriteListingsLoading
  )
  const currentUser = useAppSelector(selectCurrentUser)
  const handleListingCardClick = useListingCardClickHandler(false)

  // TODO: make this into a custom hook
  useEffect(() => {
    if (status === 'authenticated') {
      dispatch(getCurrentUser())
    }
  }, [dispatch, status])

  useEffect(() => {
    if (currentUser?.favoriteIds) {
      dispatch(getFavoriteListings())
    }
  }, [dispatch, currentUser])

  return (
    <ListingCards
      listings={favoriteListings}
      listingSearchRunning={
        status !== 'authenticated' || getFavoriteListingsLoading
      }
      onListingCardClick={handleListingCardClick}
    />
  )
}

export default FavoritesList
