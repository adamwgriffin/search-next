import type { NextPage } from 'next'
import type { MouseEvent } from 'react'
import { useState } from 'react'
import styles from './FavoriteButton.module.css'
import HeartIcon from '../../design_system/icons/HeartIcon/HeartIcon'

const FavoriteButton: NextPage = () => {
  const [isFavorite, setIsFavorite] = useState(false)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <button className={styles.favoriteButton} onClick={handleClick}>
      <HeartIcon id={isFavorite ? styles.favoriteStroke : styles.favoriteFilled} />
    </button>
  )
}

export default FavoriteButton
