import type { NextPage } from 'next'
import type { ViewType } from '../../../store/application/applicationSlice'
import styles from './ViewSwitcher.module.css'
import ListIcon from '../../icons/ListIcon/ListIcon'
import MapIcon from '../../icons/MapIcon/MapIcon'

export interface ViewSwitcherProps {
  viewType: ViewType
  onClick: () => void
}

const ViewSwitcher: NextPage<ViewSwitcherProps> = ({ viewType, onClick }) => {
  return (
    <button className={styles.viewSwitcher} onClick={onClick}>
      {viewType === 'list' ? (
        <>
          <MapIcon /> Map
        </>
      ) : (
        <>
          <ListIcon /> List
        </>
      )}
    </button>
  )
}

export default ViewSwitcher
