import type { NextPage } from 'next'
import Search from '../containers/Search'

const Home: NextPage = () => {
  return (
    <>
      <div id="app">
        <Search />
      </div>

      <style jsx>{`
        #app {
            /* height: 100% is necessary to make this element 100%, & display: flex allows it's child's height to also
            be 100% */
            display: flex;
            height: 100vh;
          }
      `}</style>
    </>
  )
}

export default Home
