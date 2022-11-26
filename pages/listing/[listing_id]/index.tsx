import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import ListingDetail from '../../../containers/ListingDetail/ListingDetail'

const ListingPage: NextPage = () => {
  const router = useRouter()
  
  return (
    <ListingDetail listingID={router.query.listing_id} />
  )
}

export default ListingPage
