import type { NextPage } from 'next'
import type { MouseEvent } from 'react'
import { useCallback } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks'
import {
  selectFavoriteIds,
  toggleFavorite
} from '../../store/user/userSlice'
import styles from './FavoriteButton.module.css'
import HeartIcon from '../../components/design_system/icons/HeartIcon/HeartIcon'

export interface FavoriteButtonProps {
  listingId: string
}

const FavoriteButton: NextPage<FavoriteButtonProps> = ({ listingId }) => {
  const dispatch = useAppDispatch()
  const favoriteIds = useAppSelector(selectFavoriteIds)

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      event.stopPropagation()
      dispatch(toggleFavorite(listingId))
    },
    [dispatch, listingId]
  )

  return (
    <button className={styles.favoriteButton} onClick={handleClick}>
      <HeartIcon
        id={
          favoriteIds.includes(listingId)
            ? styles.favoriteStroke
            : styles.favoriteFilled
        }
      />
    </button>
  )
}

export default FavoriteButton
