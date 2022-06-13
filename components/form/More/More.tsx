import type { NextPage } from 'next'
import type { StatusType } from '../../../lib/status_types'
import styles from './More.module.css'
import MenuButton from '../../MenuButton/MenuButton'
import ListingStatus from '../ListingStatus/ListingStatus'

interface MoreProps {
  status: StatusType[]
}

const More: NextPage<MoreProps> = (props) => {

  return (
    <MenuButton label="More">
      <div className={styles.more}>
        <ListingStatus status={props.status} />
      </div>
    </MenuButton>
  )
}

export default More
