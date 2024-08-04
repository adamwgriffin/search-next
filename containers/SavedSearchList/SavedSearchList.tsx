'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useAppSelector, useAppDispatch } from '../../hooks/app_hooks'
import { selectGetSavedSearchesLoading } from '../../store/user/userSlice'
import { useSearchWithFilterState } from '../../hooks/search_with_filter_state_hook'
import {
  getCurrentUser,
  getSavedSearches,
  updateSavedSearch,
  deleteSavedSearch,
  selectCurrentUser,
  selectSavedSearches
} from '../../store/user/userSlice'
import SavedSearchCard from '../../components/SavedSearchCard/SavedSearchCard'
import SavedSearchCardLoader from '../../components/SavedSearchCardLoader/SavedSearchCardLoader'
import styles from './SavedSearchList.module.css'

const SavedSearchList: React.FC = () => {
  const { status } = useSession()
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(selectCurrentUser)
  const searchWithFilterState = useSearchWithFilterState()
  const getSavedSearchesLoading = useAppSelector(selectGetSavedSearchesLoading)
  const savedSearches = useAppSelector(selectSavedSearches)

  useEffect(() => {
    if (status === 'authenticated') {
      dispatch(getCurrentUser())
    }
  }, [dispatch, status])

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(getSavedSearches(currentUser?.id))
    }
  }, [dispatch, currentUser])

  return (
    <ul className={styles.savedSearchCards}>
      {!getSavedSearchesLoading &&
        savedSearches.map((savedSearch) => (
          <li key={savedSearch.id}>
            <SavedSearchCard
              savedSearch={savedSearch}
              onClick={() => searchWithFilterState(savedSearch.searchState)}
              onUpdate={(update) =>
                dispatch(updateSavedSearch({ id: savedSearch.id, ...update }))
              }
              onDelete={() => dispatch(deleteSavedSearch(savedSearch.id))}
            />
          </li>
        ))}

      {(!currentUser?.id || getSavedSearchesLoading) &&
        [...Array(6)].map((_, i) => (
          <li key={i}>
            <SavedSearchCardLoader />
          </li>
        ))}
    </ul>
  )
}

export default SavedSearchList
