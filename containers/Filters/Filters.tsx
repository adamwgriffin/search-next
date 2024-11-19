import type { NextPage } from 'next'
import { useAppSelector, useAppDispatch } from '../../hooks/app_hooks'
import {
  selectViewType,
  setViewType
} from '../../store/application/applicationSlice'
import styles from './Filters.module.css'
import PriceMenuButton from '../../components/form/PriceMenuButton/PriceMenuButton'
import BedsAndBathsMenuButton from '../../components/form/BedsAndBathsMenuButton/BedsAndBathsMenuButton'
import MoreMenuButton from '../../components/form/MoreMenuButton/MoreMenuButton'
import FiltersButton from '../../components/form/FiltersButton/FiltersButton'
import ViewSwitcher from '../../components/form/ViewSwitcher/ViewSwitcher'
import SaveSearchButton from '../../components/form/SaveSearchButton/SaveSearchButton'

const Filters: NextPage = () => {
  const dispatch = useAppDispatch()
  const viewType = useAppSelector(selectViewType)

  return (
    <div className={styles.filters}>
      <PriceMenuButton />
      <BedsAndBathsMenuButton />
      <MoreMenuButton />
      <FiltersButton />
      <SaveSearchButton />
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
