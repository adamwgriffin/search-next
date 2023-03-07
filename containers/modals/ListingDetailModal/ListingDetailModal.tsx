import type { NextPage } from 'next'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import {
  selectModalOpen,
  closeModal,
  resetModal
} from '../../../store/application/applicationSlice'
import {
  getListingDetail,
  resetListingDetail,
  selectListing
} from '../../../store/listingDetail/listingDetailSlice'
import Modal from '../../../components/design_system/modal/Modal/Modal'
import ModalHeader from '../../../components/design_system/modal/ModalHeader/ModalHeader'
import ModalBody from '../../../components/design_system/modal/ModalBody/ModalBody'
import ListingDetail from '../../../components/listings/listing_detail/ListingDetail/ListingDetail'

export interface ListingDetailModalProps {
  listingId: number
}

const ListingDetailModal: NextPage<ListingDetailModalProps> = ({
  listingId
}) => {
  const dispatch = useAppDispatch()
  const modalOpen = useAppSelector(selectModalOpen)
  const listing = useAppSelector(selectListing)

  useEffect(() => {
    dispatch(getListingDetail(listingId.toString()))
  }, [listingId, dispatch])

  const handleClose = () => {
    dispatch(closeModal())
  }

  // the modal doesn't animate out correctly unless we reset this data on react-modal's onAfterClose event. if we don't
  // reset the data at all then it may either show the previous listing detail or not trigger a re-render, causing it to
  // show nothing.
  const handleAfterClose = () => {
    dispatch(resetModal())
    dispatch(resetListingDetail())
  }

  return (
    <Modal
      isOpen={modalOpen}
      contentLabel='Listing Detail'
      fullScreenOnMobile={true}
      onAfterClose={handleAfterClose}
    >
      <ModalHeader title='' onClose={handleClose} />
      <ModalBody>{listing && <ListingDetail listing={listing} />}</ModalBody>
    </Modal>
  )
}

export default ListingDetailModal
