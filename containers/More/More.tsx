import type { NextPage } from 'next'
import type {
  MoreFiltersParamsPartial,
  SquareFeetRangeParams,
  YearBuiltRangeParams
} from '../../lib/types/listing_service_params_types'
import type { SearchTypeOption } from '../../store/listingSearch/listingSearchSlice'
import css from 'styled-jsx/css'
import styles from './More.module.css'
import {
  useAppSelector,
  useAppDispatch,
  useRunCallbackIfChanged
} from '../../hooks'
import {
  selectOpenHouseParam,
  selectPropertyTypes,
  selectStatusParams,
  selectSquareFeetParams,
  selectLotSizeParams,
  selectYearBuiltParams,
  selectFeatureParams,
  selectSearchType,
  SearchTypes,
  setSearchType,
  setPropertyTypes,
  setFilterParams,
  searchWithUpdatedFilters
} from '../../store/listingSearch/listingSearchSlice'
import { PropertyTypeIDArray, PropertyTypes } from '../../lib/property_types'
import MenuButton from '../../components/design_system/MenuButton/MenuButton'
import SearchTypeSelector from '../../components/form/SearchTypeSelector/SearchTypeSelector'
import ListingStatus from '../../components/form/ListingStatus/ListingStatus'
import PropertyType from '../../components/form/PropertyTypes/PropertyTypes'
import SquareFeet from '../../components/form/SquareFeet/SquareFeet'
import LotSize from '../../components/form/LotSize/LotSize'
import YearBuilt from '../../components/form/YearBuilt/YearBuilt'
import OpenHouse from '../../components/form/OpenHouse/OpenHouse'
import Features from '../../components/form/Features/Features'

const More: NextPage = () => {
  const dispatch = useAppDispatch()
  const searchType = useAppSelector(selectSearchType)
  const openHouseParam = useAppSelector(selectOpenHouseParam)
  const selectedPropertyTypes = useAppSelector(selectPropertyTypes)
  const statusParams = useAppSelector(selectStatusParams)
  const squareFeetRange = useAppSelector(selectSquareFeetParams)
  const lotSizeParams = useAppSelector(selectLotSizeParams)
  const yearBuiltRange = useAppSelector(selectYearBuiltParams)
  const featureParams = useAppSelector(selectFeatureParams)
  const [setPreviousYearBuilt, runSearchIfYearBuiltChanged] =
    useRunCallbackIfChanged<YearBuiltRangeParams>(yearBuiltRange, () =>
      dispatch(searchWithUpdatedFilters())
    )
  const [setPreviousSquareFeetRange, runSearchIfSquareFeetChanged] =
    useRunCallbackIfChanged<SquareFeetRangeParams>(squareFeetRange, () =>
      dispatch(searchWithUpdatedFilters())
    )

  const handleSearchTypeChange = (searchType: SearchTypeOption) => {
    dispatch(setSearchType(searchType))
    dispatch(searchWithUpdatedFilters())
  }

  const handlePropertyTypeChange = (
    updatedPropertyTypes: PropertyTypeIDArray
  ) => {
    dispatch(setPropertyTypes(updatedPropertyTypes))
    dispatch(searchWithUpdatedFilters())
  }

  const handleChange = (params: MoreFiltersParamsPartial) => {
    dispatch(setFilterParams(params))
  }

  const handleChangeAndInitiateSearch = (params: MoreFiltersParamsPartial) => {
    dispatch(setFilterParams(params))
    dispatch(searchWithUpdatedFilters())
  }

  return (
    <>
      <MenuButton label='More' className={className}>
        <div className={styles.more}>
          <SearchTypeSelector
            searchType={searchType}
            onChange={handleSearchTypeChange}
          />
          {searchType === SearchTypes.Buy && (
            <>
              <OpenHouse
                openHouseParam={openHouseParam}
                onChange={handleChangeAndInitiateSearch}
              />
              <ListingStatus
                statusParms={statusParams}
                onChange={handleChangeAndInitiateSearch}
              />
            </>
          )}
          {searchType !== SearchTypes.Rent && (
            <PropertyType
              propertyTypes={PropertyTypes}
              params={selectedPropertyTypes}
              onChange={handlePropertyTypeChange}
            />
          )}
          <SquareFeet
            squareFeetRange={squareFeetRange}
            onChange={handleChange}
            onFocus={setPreviousSquareFeetRange}
            onBlur={runSearchIfSquareFeetChanged}
          />
          <LotSize
            lotSizeMin={lotSizeParams.lotsize_min}
            onChange={handleChangeAndInitiateSearch}
          />
          <YearBuilt
            yearBuiltRange={yearBuiltRange}
            onChange={handleChange}
            onFocus={setPreviousYearBuilt}
            onBlur={runSearchIfYearBuiltChanged}
          />
          <Features
            featureParams={featureParams}
            onChange={handleChangeAndInitiateSearch}
          />
        </div>
      </MenuButton>
      {menuButtonStyles}
    </>
  )
}

const { className, styles: menuButtonStyles } = css.resolve`
  .menu {
    left: auto;
    right: auto;
  }

  @media only screen and (min-width: 576px) {
    .menu {
      left: 50%;
      right: auto;
      transform: translateX(-50%);
    }
  }

  @media only screen and (min-width: 992px) {
    .menu {
      left: auto;
      right: 0;
      transform: none;
    }
  }
`

export default More
