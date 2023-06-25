import type { ListingSearchParams } from '../lib/url'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import Search from '../containers/Search/Search'
import { convertSearchUrlToFiltersState } from '../lib/url'

export interface SearchPageProps {
  params: string[]
}

const SearchPage: NextPage<SearchPageProps> = () => {
  const router = useRouter()

  const handleOnUpdateUrl = (query: Partial<ListingSearchParams>) => {
    router.push({
      pathname: router.pathname,
      query
    })
  }

  // TODO: will eventually validate query with zod and throw away any invalid params so that we can guaruntee that this
  // function will always be passed the correct type
  const filtersState = convertSearchUrlToFiltersState(
    router.query as Partial<ListingSearchParams>
  )
  return <Search filtersState={filtersState} onUpdateUrl={handleOnUpdateUrl} />
}

export default SearchPage
