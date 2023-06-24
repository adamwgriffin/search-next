import camelCase from 'lodash/camelCase'
import kebabCase from 'lodash/kebabCase'
import omit from 'lodash/omit'
import { SortTypeLabels } from '../components/form/SortMenu/SortMenu'
import { SearchTypes } from '../store/filters/filtersSlice'
import type { FiltersState } from '../store/filters/filtersTypes'
import type { PropertyType } from './property_types'
import type { SortType } from './types/listing_service_params_types'

export const addUrlToBrowserHistory = (url: string) => {
  const currentUrl = window.location.href
  history.replaceState({}, '', url)
  history.replaceState({}, '', currentUrl)
}

/*
Example URL:
http://localhost:3000/Fremont,Seattle,WA/search-type=rental/price-min=1000/price-max=800000/beds-min=2
/baths-min=1/property-type=single-family,multi-family,condo,townhouse/open-house
/min-lot-size=2000/include-pending/waterfront/pool
*/

const mapSearchParamsToFilterState = (
  params: string[]
): Partial<FiltersState> => {
  const state: Partial<FiltersState> = {}
  params.forEach((param) => {
    const [key, value] = param.split('=')
    switch (key) {
      case 'rental':
        state.searchType = SearchTypes.Rent
        break
      case 'sold':
        state.searchType = SearchTypes.Sold
        break
      case 'property-types':
        state.propertyTypes = value.split(',') as PropertyType[]
        break
      case 'sort-by':
        state.sortBy = value as SortType
        state.sortDirection =
          SortTypeLabels.find((l) => l.type === value)?.direction || 'desc'
        break
      case 'page-index':
      case 'price-min':
      case 'price-max':
      case 'beds-min':
      case 'baths-min':
      case 'sqft-min':
      case 'sqft-max':
      case 'lot-size-min':
      case 'year-built-min':
      case 'year-built-max':
        state[camelCase(key)] = Number(value)
        break
      case 'include-pending':
      case 'waterfront':
      case 'view':
      case 'fireplace':
      case 'basement':
      case 'garage':
      case 'new-construction':
      case 'pool':
      case 'air-conditioning':
      case 'open-house':
        state[camelCase(key)] = true
        break
    }
  })
  return state
}

const convertFilterStateToSearchUrl = (
  filterState: Partial<FiltersState>
): string => {
  const partialState = omit(filterState, 'locationSearchField', 'searchType')
  const filterParams = []
  if (filterState.locationSearchField) {
    filterParams.push(
      filterState.locationSearchField
        .split(',')
        .map((s) => encodeURIComponent(s.trim()))
        .join(',')
    )
  }
  if (filterState.searchType) {
    switch (filterState.searchType) {
      case SearchTypes.Rent:
        filterParams.push('rental')
        break
      case SearchTypes.Sold:
        filterParams.push('sold')
        break
    }
  }
  Object.entries(partialState).forEach(([key, value]) => {
    filterParams.push(
      typeof value === 'boolean'
        ? `${kebabCase(key)}`
        : `${kebabCase(key)}=${value}`
    )
  })
  return '/' + filterParams.join('/')
}

// on first load we need to get the url, parse it's params and map them to the filterState slice so that we can do the
// initial search correctly
export const convertSearchUrlToFilterState = (
  params: string[]
): Partial<FiltersState> => {
  const filterState = mapSearchParamsToFilterState(params.slice(1))
  filterState.locationSearchField = params[0].split(',').join(', ')
  return filterState
}

/* we need to sync the FilterState with the search url. each time the location changes, or a filter is added
or removed, we need to update the url with the minimum amount of params that are needed to represent the new state. this
means that we don't want to add any params to the url that are the same as the default FilterState. The only time
we would update the search location part of the url is when a search is initiated. */
export const updateSearchUrl = (
  filterState: Partial<FiltersState>
) => {
  history.pushState(
    null,
    '',
    convertFilterStateToSearchUrl(filterState)
  )
}
