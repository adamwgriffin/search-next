import type { NextPage } from 'next'
import Link from 'next/link'
import GoogleMapsProvider from '../../providers/GoogleMapsProvider'
import styles from './Home.module.css'
import HomePageHeader from '../../components/header/HomePageHeader/HomePageHeader'
import StandaloneSearchField from '../StandaloneSearchField/StandaloneSearchField'

const Home: NextPage = () => {
  return (
    <GoogleMapsProvider>
      <div className={styles.home}>
        <div>
          <HomePageHeader />
        </div>

        <div className={styles.body}>
          <div className={styles.hero}>
            <h1>Discover the Awsöm!</h1>
            <StandaloneSearchField />
          </div>

          <main className={styles.mainContent}>
            <h2>Explore homes on Awsom</h2>
            <p>
              Check out awsöm homes with our patented{' '}
              <em>&quot;Search That Doesn&apos;t Suck™</em>&quot;. A brand new
              search that looks cool and skips all the features you don&apos;t
              really use.
            </p>

            <h2>Hot Searches in Seattle 🔥</h2>
            <ul>
              <li>
                Checkout{' '}
                <Link href='/homes?location=Fremont--Seattle--WA--USA'>
                  Fremont
                </Link>
                , a great neighborhood that you probably can&apos;t afford, but
                it does&apos;t hurt to look!
              </li>
              <li>
                Search for{' '}
                <Link href='/homes?location=Ballard--Seattle--WA--USA&beds-min=2&baths-min=1'>
                  {' '}
                  Ballard 2+bd 1+ba
                </Link>{' '}
                but be prepared to pay a lot of 💰💰💰💰💰💰💰💰 :(
              </li>
            </ul>
          </main>
        </div>
      </div>
    </GoogleMapsProvider>
  )
}

export default Home
