import type { IOpenHouse } from '../../../../lib/types/listing_types'
import type { NextPage } from 'next'
import styles from './OpenHouseList.module.css'

export interface OpenHouseListProps {
  openHouses: IOpenHouse[]
}

const formatDate = (isoDateString: string) => {
  const date = new Date(isoDateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  })
}

const formatTime = (isoDateString: string) => {
  const date = new Date(isoDateString)
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })
}

const OpenHouseList: NextPage<OpenHouseListProps> = ({ openHouses }) => {
  return (
    <div>
      <h4>Open House</h4>
      <ul className={styles.openHouseList}>
        {openHouses.map(({ start, end }, i) => (
          <li key={i} className={styles.openHouse}>
            <div className={styles.date}>{formatDate(start)}</div>
            <div className={styles.time}>
              {formatTime(start)} to {formatTime(end)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default OpenHouseList
