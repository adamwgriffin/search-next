import type { NextPage } from 'next'
import type { MouseEvent } from 'react'
import { useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useAppSelector, useAppDispatch } from '../../hooks/app_hooks'
import { selectFavoriteIds, toggleFavorite } from '../../store/user/userSlice'
import { openModal } from '../../store/application/applicationSlice'
import styles from './FavoriteButton.module.css'
import HeartIcon from '../../components/design_system/icons/HeartIcon/HeartIcon'

export interface FavoriteButtonProps {
  listingId: string
}

const FavoriteButton: NextPage<FavoriteButtonProps> = ({ listingId }) => {
  const dispatch = useAppDispatch()
  const { data: session } = useSession()
  const favoriteIds = useAppSelector(selectFavoriteIds)

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      event.stopPropagation()
      if (session?.user) {
        dispatch(toggleFavorite(listingId))
      } else {
        dispatch(openModal({ modalType: 'loginOrRegister' }))
      }
    },
    [dispatch, listingId, session?.user]
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
