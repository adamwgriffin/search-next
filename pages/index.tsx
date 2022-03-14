import type { NextPage } from 'next'
import Header from '../containers/Header/Header'
import Main from '../components/Main/Main'
import Search from '../components/Search/Search'

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Main>
        <Search />
      </Main>
    </>
  )
}

export default Home
