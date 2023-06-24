import { useRouter } from 'next/router'
import { NextPage } from 'next'
import Home from '../containers/Home/Home'
import Search from '../containers/Search/Search'
import { convertSearchUrlToFilterState } from '../lib/url'

export interface SearchPageProps {
  params: string[]
}

const SearchPage: NextPage<SearchPageProps> = () => {
  const router = useRouter()
  const { params } = router.query
  // if we have any params that means we're doing a search instead of displaying the home page
  if (Array.isArray(params) && params.length) {
    const filtersState = convertSearchUrlToFilterState(params)
    return <Search filtersState={filtersState} />
  }
  return <Home />
}

export default SearchPage
