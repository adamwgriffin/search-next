'use client'

import { type ReactNode, useState } from 'react'
import styles from './ShowMore.module.css'

export type ShowMoreProps = {
  children: ReactNode
}

const ShowMore: React.FC<ShowMoreProps> = ({ children }) => {
  const [show, setShow] = useState(false)

  return (
    <div>
      <div className={show ? styles.textContainerShow : styles.textContainer}>
        {children}
      </div>
      <div className={styles.showMoreToggleContainer}>
        <button
          className={styles.showMoreToggle}
          onClick={() => setShow(!show)}
        >
          {show ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </div>
  )
}

export default ShowMore
