'use client'

import type { ListingDetailParams } from '../../api/listing_detail/[slug]/route'
import { useParams } from 'next/navigation'
import { useGetListingDetailQuery } from '../../../store/listingDetail/listingDetailSlice'
import GoogleMapsProvider from '../../../providers/GoogleMapsProvider'
import ListingDetailHeader from '../../../containers/ListingDetailHeader/ListingDetailHeader'
import ListingDetail from '../../../components/listings/listing_detail/ListingDetail/ListingDetail'
import LoginOrRegisterModal from '../../../containers/modals/LoginOrRegisterModal/LoginOrRegisterModal'
import LoadingDots from '../../../components/design_system/LoadingDots/LoadingDots'
import styles from './page.module.css'

const ListingPage: React.FC = () => {
  const params = useParams<ListingDetailParams>()
  const {
    data: listing,
    error,
    isLoading
  } = useGetListingDetailQuery(params.slug)

  return (
    <GoogleMapsProvider libraries={['places']}>
      <div className={styles.page}>
        <ListingDetailHeader />
        <div className={styles.pageContainer}>
          {isLoading && <LoadingDots size='2rem' />}
          {listing && <ListingDetail listing={listing} />}
          {error && (
            <div className={styles.notFound}>
              <div className={styles.notFoundIcon}>🤷‍♂️</div>
              <div>We couldn&apos;t find that one</div>
            </div>
          )}
        </div>
      </div>
      <LoginOrRegisterModal />
    </GoogleMapsProvider>
  )
}

export default ListingPage
