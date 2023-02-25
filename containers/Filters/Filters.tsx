import type { NextPage } from 'next'
import type {
  PriceRangeParams,
  BedsBathsParam
} from '../../lib/types/listing_service_params_types'
import {
  useAppSelector,
  useAppDispatch,
  useRunCallbackIfChanged
} from '../../hooks'
import {
  selectPriceRange,
  selectBedBathParams,
  setFilterParams,
  searchWithUpdatedFilters
} from '../../store/listingSearch/listingSearchSlice'
import { openModal } from '../../store/application/applicationSlice'
import {
  selectViewType,
  setViewType
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
  const dispatch = useAppDispatch()
  const priceRange = useAppSelector(selectPriceRange)
  const [setPreviousPriceRange, runSearchIfPriceRangeChanged] =
    useRunCallbackIfChanged(priceRange, () =>
      dispatch(searchWithUpdatedFilters())
    )
  const bedsAndBaths = useAppSelector(selectBedBathParams)
  const viewType = useAppSelector(selectViewType)

  const handleBedsAndBathsChange = (param: Partial<BedsBathsParam>) => {
    dispatch(setFilterParams(param))
    dispatch(searchWithUpdatedFilters())
  }

  const handlePriceChange = (priceRange: Partial<PriceRangeParams>) => {
    dispatch(setFilterParams(priceRange))
  }

  const handleFiltersButtonClick = () => {
    dispatch(
      openModal({
        modalType: 'filters',
        modalProps: { title: 'Filters' }
      })
    )
  }

  const handleSaveSearch = () => {
    dispatch(
      openModal({
        modalType: 'saveSearch',
        modalProps: { title: 'Save Search' }
      })
    )
  }

  const handleViewSwitcherClick = () => {
    dispatch(setViewType(viewType === 'list' ? 'map' : 'list'))
  }

  return (
    <div className={styles.filters}>
      <PriceMenuButton>
        <Price
          priceRange={priceRange}
          onChange={handlePriceChange}
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
      <FiltersButton onClick={handleFiltersButtonClick} />
      <OutlinedButton textColor='var(--primary)' onClick={handleSaveSearch}>
        Save Search
      </OutlinedButton>
      <ViewSwitcher viewType={viewType} onClick={handleViewSwitcherClick} />
    </div>
  )
}

export default Filters
