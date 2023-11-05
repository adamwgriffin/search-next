'use client'

import type { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAppSelector } from '../../hooks'
import { selectSearchState } from '../../store/filters/filtersSelectors'
import GoogleMapsProvider from '../../providers/GoogleMapsProvider'
import { AppGoogleMapsLoaderOptions } from '../../config/googleMapsOptions'
import { searchStateToListingSearchURLParams } from '../../lib/url'
import styles from './Home.module.css'
import HomePageHeader from '../../components/header/HomePageHeader/HomePageHeader'
import SearchFieldContainer from '../SearchFieldContainer/SearchFieldContainer'

const Home: NextPage = () => {
  // TODO: make this search code that's duplicated in ListingDetailHeader into a hook that both can share
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
    <GoogleMapsProvider loaderOptions={AppGoogleMapsLoaderOptions}>
      <div className={styles.home}>
        <div>
          <HomePageHeader />
        </div>

        <div className={styles.body}>
          <div className={styles.hero}>
            <h1>Discover the Awsöm!</h1>
            <SearchFieldContainer
              onSearchInitiated={handleOnSearchInitiated}
              onOptionSelected={handleOnOptionSelected}
            />
          </div>

          <main className={styles.mainContent}>
            <h2>Explore homes on AwsömRE</h2>
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
