import MinimalHeader from '../../../components/header/MinimalHeader/MinimalHeader'
import AccountBody from '../../../components/AccountBody/AccountBody'
import FavoritesList from '../../../containers/FavoritesList/FavoritesList'

export default function Favorites() {
  return (
    <>
      <MinimalHeader />
      <AccountBody>
        <h1>Saved Homes</h1>
        <FavoritesList />
      </AccountBody>
    </>
  )
}
