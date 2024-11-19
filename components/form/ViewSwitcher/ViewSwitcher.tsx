import { selectViewType, setViewType } from '../../../store/application/applicationSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/app_hooks'
import ListIcon from '../../design_system/icons/ListIcon/ListIcon'
import MapIcon from '../../design_system/icons/MapIcon/MapIcon'
import styles from './ViewSwitcher.module.css'

const ViewSwitcher: React.FC = () => {
  const dispatch = useAppDispatch()
  const viewType = useAppSelector(selectViewType)
  
  return (
    <button className={styles.viewSwitcher} onClick={() => {
      dispatch(setViewType(viewType === 'list' ? 'map' : 'list'))
    }}>
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
