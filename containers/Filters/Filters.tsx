import type { NextPage } from 'next'
import type { BedsAndBathsFilters } from '../../store/filters/filtersTypes'
import { useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useAppSelector, useAppDispatch } from '../../hooks/app_hooks'
import { useRunCallbackIfChanged } from '../../hooks/run_callback_if_changed_hook'
import { searchWithUpdatedFilters } from '../../store/listingSearch/listingSearchCommon'
import { setFilters } from '../../store/filters/filtersSlice'
import {
  selectPriceRange,
  selectBedBathFilters
} from '../../store/filters/filtersSelectors'
import {
  selectViewType,
  setViewType,
  openModal
} from '../../store/application/applicationSlice'
import styles from './Filters.module.css'
import PriceMenuButton from '../../components/form/PriceMenuButton/PriceMenuButton'
import Price from '../../components/form/Price/Price'
import BedsAndBathsMenuButton from '../../components/form/BedsAndBathsMenuButton/BedsAndBathsMenuButton'
import BedsAndBaths from '../../components/form/BedsAndBaths/BedsAndBaths'
import MoreMenuButton from '../../components/form/MoreMenuButton/MoreMenuButton'
import More from '../../containers/More/More'
import FiltersButton from '../../components/form/FiltersButton/FiltersButton'
import ViewSwitcher from '../../components/form/ViewSwitcher/ViewSwitcher'
import OutlinedButton from '../../components/design_system/OutlinedButton/OutlinedButton'

const Filters: NextPage = () => {
  const { data: session } = useSession()
  const dispatch = useAppDispatch()
  const priceRange = useAppSelector(selectPriceRange)
  const [setPreviousPriceRange, runSearchIfPriceRangeChanged] =
    useRunCallbackIfChanged(priceRange, () =>
      dispatch(searchWithUpdatedFilters())
    )
  const bedsAndBaths = useAppSelector(selectBedBathFilters)
  const viewType = useAppSelector(selectViewType)

  const handleBedsAndBathsChange = useCallback(
    (param: Partial<BedsAndBathsFilters>) => {
      dispatch(setFilters(param))
      dispatch(searchWithUpdatedFilters())
    },
    [dispatch]
  )

  const handleSaveSearch = useCallback(() => {
    if (session?.user) {
      dispatch(openModal({ modalType: 'saveSearch' }))
    } else {
      dispatch(openModal({ modalType: 'loginOrRegister' }))
    }
  }, [dispatch, session?.user])

  return (
    <div className={styles.filters}>
      <PriceMenuButton>
        <Price
          priceRange={priceRange}
          onChange={(priceRange) => {
            dispatch(setFilters(priceRange))
          }}
          onFocus={setPreviousPriceRange}
          onBlur={runSearchIfPriceRangeChanged}
        />
      </PriceMenuButton>
      <BedsAndBathsMenuButton>
        <BedsAndBaths
          onChange={handleBedsAndBathsChange}
          bedsAndBaths={bedsAndBaths}
        />
      </BedsAndBathsMenuButton>
      <MoreMenuButton>
        <More />
      </MoreMenuButton>
      <FiltersButton
        onClick={() => {
          dispatch(openModal({ modalType: 'filters' }))
        }}
      />
      <OutlinedButton textColor='var(--primary)' onClick={handleSaveSearch}>
        Save Search
      </OutlinedButton>
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
