import { useMedia } from 'react-use'
import { useAppDispatch } from '.'
import { openModal } from '../store/application/applicationSlice'
import { addUrlToBrowserHistory } from '../lib/url'

export const useListingCardClickHandler = (addUrlOnModalOpen = true) => {
  const dispatch = useAppDispatch()
  const isSmallAndUp = useMedia('(min-width: 576px)', false)

  return (url: string, listingId: string) => {
    if (isSmallAndUp) {
      window.open(url, '_blank')
    } else {
      dispatch(
        openModal({
          modalType: 'listingDetail',
          modalProps: { listingId }
        })
      )
      if (addUrlOnModalOpen) addUrlToBrowserHistory(url)
    }
  }
}
