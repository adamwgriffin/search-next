'use client'

import type { FiltersState } from '../../store/filters/filtersTypes'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useState, useCallback, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useEvent } from 'react-use'
import isEqual from 'lodash/isEqual'
import { useAppSelector, useAppDispatch } from '../../hooks/app_hooks'
import {
  listingSearchURLParamsToSearchState,
  searchStateToListingSearchURLParams
} from '../../lib/url'
import {
  initialState,
  clearFilters,
  setFilters
} from '../../store/filters/filtersSlice'
import {
  selectInitialSearchComplete,
  selectListingSearchRunning
} from '../../store/listingSearch/listingSearchSelectors'
import Search from '../../containers/Search/Search'
import { selectSearchState } from '../../store/filters/filtersSelectors'
import {
  searchNewLocation,
  searchCurrentLocation
} from '../../store/listingSearch/listingSearchSlice'
import { getCurrentUser } from '../../store/user/userSlice'
import GoogleMapsProvider from '../../providers/GoogleMapsProvider'

export interface SearchPageProps {
  params: string[]
}

const SearchPage: NextPage<SearchPageProps> = () => {
  const { status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const listingSearchRunning = useAppSelector(selectListingSearchRunning)
  const initialSearchComplete = useAppSelector(selectInitialSearchComplete)
  const searchState = useAppSelector(selectSearchState)
  const [previousSearchState, setPreviousSearchState] =
    useState<Partial<FiltersState>>()
  
  // TODO: make this into a custom hook
  useEffect(() => {
    if (status === 'authenticated') {
      dispatch(getCurrentUser())
    }
  }, [dispatch, status])

  // get the browser url query string, convert it to a state object, use it to set the state, then run a new search
  // based on that state.
  // TODO: we will eventually validate query params with zod and throw away any that are invalid, so that we can
  // guarantee that this function will always be passed valid data
  const getSearchParamsAndSetSearchState =
    useCallback((): Partial<FiltersState> => {
      // we have to include all the intial state and then override those defaults with the params from the url. this is
      // necessary because the url only includes params that are different from the default filters. it is possible for
      // the app's filters to have been changed from the default but then a brand new url is entered. in that scenario
      // the internal state and the url params may get out of sync.
      const newSearchState = {
        ...initialState,
        ...listingSearchURLParamsToSearchState(
          new URLSearchParams(window.location.search)
        )
      }
      dispatch(setFilters(newSearchState))
      return newSearchState
    }, [dispatch])

  useEffect(() => {
    // run a search based on the url on initial render
    getSearchParamsAndSetSearchState()
    dispatch(searchNewLocation())

    // reset the filters when the user navigates away from the search page, otherwise a subsequent search from the home
    // page could include filters from the previous search
    return () => {
      dispatch(clearFilters())
    }
  }, [dispatch, getSearchParamsAndSetSearchState])

  // if the user clicks the back or forward button in the browser, we want to get the url that was loaded from the
  // previous/next part of the browser history, and then run a new search to match the url params. the "popstate" event
  // is triggered whenever the history is changed by the user in this way.
  const onPopState = useCallback(() => {
    const newSearchState = getSearchParamsAndSetSearchState()
    if (
      newSearchState.locationSearchField ===
      previousSearchState?.locationSearchField
    ) {
      dispatch(searchCurrentLocation())
    } else {
      dispatch(searchNewLocation())
    }
  }, [
    dispatch,
    getSearchParamsAndSetSearchState,
    previousSearchState?.locationSearchField
  ])

  useEvent('popstate', onPopState)

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
      router.push(
        pathname +
          '?' +
          new URLSearchParams(searchStateToListingSearchURLParams(searchState))
      )
      setPreviousSearchState(searchState)
    }
  }, [
    listingSearchRunning,
    initialSearchComplete,
    searchState,
    previousSearchState,
    router,
    pathname
  ])

  return (
    <GoogleMapsProvider>
      <Search />
    </GoogleMapsProvider>
  )
}

export default SearchPage
