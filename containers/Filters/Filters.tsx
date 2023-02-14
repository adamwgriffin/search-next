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
import {
  selectViewType,
  setViewType
} from '../../store/application/applicationSlice'
import styles from './Filters.module.css'
import Price from '../../components/form/Price/Price'
import BedsAndBaths from '../../components/form/BedsAndBaths/BedsAndBaths'
import More from '../../containers/More/More'
import ViewSwitcher from '../../components/form/ViewSwitcher/ViewSwitcher'
import OutlinedButton from '../../components/design_system/OutlinedButton/OutlinedButton'
import { countArr } from '../../lib/beds_and_baths'

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

  const handleSaveSearch = () => {
    alert('TBD')
  }

  const handleViewSwitcherClick = () => {
    dispatch(setViewType(viewType === 'list' ? 'map' : 'list'))
  }

  return (
    <div className={styles.filters}>
      <Price
        priceRange={priceRange}
        onChange={handlePriceChange}
        onFocus={setPreviousPriceRange}
        onBlur={runSearchIfPriceRangeChanged}
      />
      <BedsAndBaths
        countArr={countArr}
        onChange={handleBedsAndBathsChange}
        bedsAndBaths={bedsAndBaths}
      />
      <More />
      <OutlinedButton textColor='var(--primary)' onClick={handleSaveSearch}>
        Save Search
      </OutlinedButton>
      <ViewSwitcher viewType={viewType} onClick={handleViewSwitcherClick} />
    </div>
  )
}

export default Filters
