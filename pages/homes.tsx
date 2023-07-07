import type { FiltersState } from '../store/filters/filtersTypes'
import type { NextPage } from 'next'
import { useState, useCallback, useEffect } from 'react'
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
import {
  searchNewLocation,
  searchCurrentLocation
} from '../store/listingSearch/listingSearchSlice'
import GoogleMapsProvider from '../context/google_maps_context'
import { AppGoogleMapsLoaderOptions } from '../config/googleMapsOptions'

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

  // get the browser url query string, convert it to a state object, use it to set the state, then run a new search
  // based on that state
  const getSearchParamsAndSetSearchState =
    useCallback((): Partial<FiltersState> => {
      // TODO: will eventually validate query params with zod and throw away any that are invalid, so that we can
      // guarantee that this function will always be passed valid data
      const newSearchState = listingSearchURLParamsToSearchState(
        new URLSearchParams(window.location.search)
      )
      dispatch(setFilters(newSearchState))
      return newSearchState
    }, [dispatch])

  useEffect(() => {
    // run a search based on the url on initial render
    getSearchParamsAndSetSearchState()
    dispatch(searchNewLocation())

    // reset the filters when the user navigates away from the search page, otherwise a subsequent search from the home
    // page may include them
    return () => {
      dispatch(clearFilters())
    }
  }, [dispatch, getSearchParamsAndSetSearchState])

  // if the user clicks the back or forward button in the browser, we want to get the url that was loaded from the
  // previous/next part of the browser history, and then run a new search to match the url params. the "popstate" event
  // is triggered whenever the history is changed by the user in this way.
  useEffect(() => {
    router.beforePopState(() => {
      // avoid running a search if previous/next url moves us away from the search page, e.g., going from /homes to /
      if (window.location.pathname === router.pathname) {
        const newSearchState = getSearchParamsAndSetSearchState()
        if (
          newSearchState.locationSearchField ===
          previousSearchState?.locationSearchField
        ) {
          dispatch(searchCurrentLocation())
        } else {
          dispatch(searchNewLocation())
        }
      }
      // the router will not navigate to the new url automatically unless we return true
      return true
    })
  }, [
    dispatch,
    getSearchParamsAndSetSearchState,
    previousSearchState?.locationSearchField,
    router
  ])

  // each time the user triggers a new search, we want to update the url, so that if the user were to visit this new
  // url, it would load this specific search. we're checking initialSearchComplete here because we don't want to change
  // the url if we just used it to set the searchState and run the initial search in the useMount callback. it's only on
  // subsequent runs that we would want to update the url to reflect whatever filters the user has changed. doing this
  // prevents us from adding a duplicate url to the browser history, which can make if seem as if the back button
  // doesn't work if the user clicks it after the search page first loads
  useEffect(() => {
    const shouldUpdateURL =
      listingSearchRunning &&
      initialSearchComplete &&
      // avoid updating unless the searchState changed, otherwise clicking the back button will not change the url
      !isEqual(searchState, previousSearchState)
    if (shouldUpdateURL) {
      router.push({
        pathname: router.pathname,
        query: searchStateToListingSearchURLParams(searchState)
      })
      setPreviousSearchState(searchState)
    }
  }, [
    listingSearchRunning,
    initialSearchComplete,
    searchState,
    previousSearchState,
    router
  ])

  return (
    <GoogleMapsProvider loaderOptions={AppGoogleMapsLoaderOptions}>
      <Search />
    </GoogleMapsProvider>
  )
}

export default SearchPage
