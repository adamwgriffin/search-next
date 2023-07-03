import type { FiltersState } from '../store/filters/filtersTypes'
import type { NextPage } from 'next'
import { useState, useCallback } from 'react'
import { useMount, useUnmount, useEvent } from 'react-use'
import { useRouter } from 'next/router'
import isEqual from 'lodash/isEqual'
import { useAppSelector, useAppDispatch } from '../hooks'
import {
  listingSearchURLParamsToSearchState,
  searchStateToListingSearchURLParams
} from '../lib/url'
import { clearFilters } from '../store/filters/filtersSlice'
import { selectInitialSearchComplete } from '../store/listingSearch/listingSearchSelectors'
import Search from '../containers/Search/Search'

export interface SearchPageProps {
  params: string[]
}

const SearchPage: NextPage<SearchPageProps> = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initialSearchComplete = useAppSelector(selectInitialSearchComplete)
  const [searchState, setSearchState] = useState<Partial<FiltersState>>()
  const [previousState, setPreviousState] = useState<Partial<FiltersState>>()

  // TODO: will eventually validate query with zod and throw away any invalid params so that we can guaruntee that this
  // function will always be passed valid params
  const setFiltersStateToUrlSearchParams = useCallback(() => {
    setSearchState(
      listingSearchURLParamsToSearchState(
        new URLSearchParams(window.location.search)
      )
    )
  }, [setSearchState])

  // get the browser url, convert it to a state object and use it to set app state to match the state encoded in the url
  // params when the page first loads. the filtersState variable that holds this object is passed as a prop to <Search>
  // which uses it to actually set the state in the store.
  useMount(setFiltersStateToUrlSearchParams)

  // if the user clicks the back or forward button in the browser, we want to get the url that was loaded from the
  // previous/next part of the browser history and then set the app state to match the state represented in the url
  // params. the "popstate" event is triggered whenever the history is changed by the user this way.
  useEvent('popstate', setFiltersStateToUrlSearchParams)

  // reset the filters when the user navigates away from the search page, otherwise subsequest search from the home page
  // may include them
  useUnmount(() => dispatch(clearFilters()))

  const handleOnListingSearchRunning = useCallback(
    (state: Partial<FiltersState>) => {
      // checking initialSearchComplete since we don't need to change the url if we just used it to set the FiltersState
      // and run the initial search. it's only on subsequent runs that we would want to update the url to reflect
      // whatever filters the user has changed. doing this prevents us from adding a duplicate url to the browser
      // history, which can make if seem as if the back button doesn't work if the user clicks it after the search page
      // first loads
      if (initialSearchComplete && !isEqual(state, previousState)) {
        router.push({
          pathname: router.pathname,
          query: searchStateToListingSearchURLParams(state)
        })
      }
      setPreviousState(state)
    },
    [router, initialSearchComplete, previousState]
  )

  return (
    <Search
      searchState={searchState}
      onListingSearchRunning={handleOnListingSearchRunning}
    />
  )
}

export default SearchPage
