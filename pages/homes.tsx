import type { FiltersState } from '../store/filters/filtersTypes'
import type { NextPage } from 'next'
import { useState, useCallback, useEffect } from 'react'
import { useMount, useUnmount, useEvent } from 'react-use'
import { useRouter } from 'next/router'
import isEqual from 'lodash/isEqual'
import { useAppSelector, useAppDispatch } from '../hooks'
import {
  listingSearchURLParamsToSearchState,
  searchStateToListingSearchURLParams
} from '../lib/url'
import { clearFilters, setFilters } from '../store/filters/filtersSlice'
import {
  selectInitialSearchComplete,
  selectListingSearchRunning
} from '../store/listingSearch/listingSearchSelectors'
import Search from '../containers/Search/Search'
import { selectSearchState } from '../store/filters/filtersSelectors'
import { searchNewLocation } from '../store/listingSearch/listingSearchSlice'

export interface SearchPageProps {
  params: string[]
}

const SearchPage: NextPage<SearchPageProps> = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const listingSearchRunning = useAppSelector(selectListingSearchRunning)
  const initialSearchComplete = useAppSelector(selectInitialSearchComplete)
  const searchState = useAppSelector(selectSearchState)
  const [previousSearchState, setPreviousSearchState] =
    useState<Partial<FiltersState>>()

  // get the browser url query string, convert it to a state object, use it to set the state, then run a new search base
  // on that state
  const runNewSearchWithURLSearchParams = useCallback(() => {
    // TODO: will eventually validate query params with zod and throw away any that are invalid, so that we can
    // guaruntee that this function will always be passed valid data
    const searchState = listingSearchURLParamsToSearchState(
      new URLSearchParams(window.location.search)
    )
    dispatch(setFilters(searchState))
    dispatch(searchNewLocation())
  }, [dispatch])

  // run a search based on the url when the page first loads.
  useMount(runNewSearchWithURLSearchParams)

  // if the user clicks the back or forward button in the browser, we want to get the url that was loaded from the
  // previous/next part of the browser history and then run a new search to match the url params. the "popstate" event
  // is triggered whenever the history is changed by the user in this way.
  useEvent('popstate', runNewSearchWithURLSearchParams)

  // each time the user updates the filters, or searches for a new location, we want to update the url to reflect the
  // new search. we're checking initialSearchComplete because we don't need to change the url if we just used it to
  // set the FiltersState and run the initial search in the useMount callback above. it's only on subsequent runs that
  // we would want to update the url to reflect whatever filters the user has changed. doing this prevents us from
  // adding a duplicate url to the browser history, which can make if seem as if the back button doesn't work if the
  // user clicks it after the search page first loads
  useEffect(() => {
    if (
      listingSearchRunning &&
      initialSearchComplete &&
      !isEqual(searchState, previousSearchState)
    ) {
      router.push({
        pathname: router.pathname,
        query: searchStateToListingSearchURLParams(searchState)
      })
    }
    setPreviousSearchState(searchState)
  }, [
    router,
    initialSearchComplete,
    searchState,
    previousSearchState,
    listingSearchRunning
  ])

  // reset the filters when the user navigates away from the search page, otherwise subsequest search from the home page
  // may include them
  useUnmount(() => dispatch(clearFilters()))

  return <Search />
}

export default SearchPage
