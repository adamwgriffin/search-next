import type { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '../../hooks'
import { selectSearchState } from '../../store/filters/filtersSelectors'
import styles from './ListingDetailHeader.module.css'
import Logo from '../../components/header/Logo/Logo'
import SearchFieldContainer from '../SearchFieldContainer/SearchFieldContainer'
import UserMenu from '../UserMenu/UserMenu'
import { searchStateToListingSearchURLParams } from '../../lib/url'

const ListingDetailHeader: NextPage = () => {
  const router = useRouter()
  const searchState = useAppSelector(selectSearchState)

  const handleOnSearchInitiated = () => {
    router.push(
      '/homes?' +
        new URLSearchParams(searchStateToListingSearchURLParams(searchState))
    )
  }

  const handleOnOptionSelected = (
    autocompletePrediction: google.maps.places.AutocompletePrediction
  ) => {
    // locationSearchField doesn't get updated in searchState by the time we execute this function, so we only get the
    // partial text that was typed in the field instead of the entire text that was selected in the autocomplete. we're
    // adding the autocompletePrediction.description here to make sure the search is correct.
    router.push(
      '/homes?' +
        new URLSearchParams(
          searchStateToListingSearchURLParams({
            ...searchState,
            locationSearchField: autocompletePrediction.description
          })
        )
    )
  }

  return (
    <header className={styles.header}>
      <Logo />
      <SearchFieldContainer
        onSearchInitiated={handleOnSearchInitiated}
        onOptionSelected={handleOnOptionSelected}
      />
      <UserMenu />
    </header>
  )
}

export default ListingDetailHeader
