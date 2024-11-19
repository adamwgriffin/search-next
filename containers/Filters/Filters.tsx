import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useAppSelector, useAppDispatch } from '../../hooks/app_hooks'
import {
  selectViewType,
  setViewType,
} from '../../store/application/applicationSlice'
import styles from './Filters.module.css'
import PriceMenuButton from '../../components/form/PriceMenuButton/PriceMenuButton'
import BedsAndBathsMenuButton from '../../components/form/BedsAndBathsMenuButton/BedsAndBathsMenuButton'
import MoreMenuButton from '../../components/form/MoreMenuButton/MoreMenuButton'
import FiltersButton from '../../components/form/FiltersButton/FiltersButton'
import ViewSwitcher from '../../components/form/ViewSwitcher/ViewSwitcher'
import OutlinedButton from '../../components/design_system/OutlinedButton/OutlinedButton'

const Filters: NextPage = () => {
  const { data: session } = useSession()
  const dispatch = useAppDispatch()
  const viewType = useAppSelector(selectViewType)

  const handleSaveSearch = useCallback(() => {
    if (session?.user) {
      dispatch(openModal({ modalType: 'saveSearch' }))
    } else {
      dispatch(openModal({ modalType: 'loginOrRegister' }))
    }
  }, [dispatch, session?.user])

  return (
    <div className={styles.filters}>
      <PriceMenuButton />
      <BedsAndBathsMenuButton />
      <MoreMenuButton />
      <OutlinedButton textColor='var(--primary)' onClick={handleSaveSearch}>
        Save Search
      </OutlinedButton>
      <FiltersButton />
      <ViewSwitcher
        viewType={viewType}
        onClick={() => {
          dispatch(setViewType(viewType === 'list' ? 'map' : 'list'))
        }}
      />
    </div>
  )
}

export default Filters
