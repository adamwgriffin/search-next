import type { NextPage } from 'next'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import {
  selectModalOpen,
  closeModal
} from '../../../store/application/applicationSlice'
import { selectTotalListings } from '../../../store/listingSearch/listingSearchSlice'
import Modal from '../../../components/design_system/modal/Modal/Modal'
import ModalHeader from '../../../components/design_system/modal/ModalHeader/ModalHeader'
import ModalBody from '../../../components/design_system/modal/ModalBody/ModalBody'
import ModalFooter from '../../../components/design_system/modal/ModalFooter/ModalFooter'
import More from '../../More/More'
import TextButton from '../../../components/design_system/TextButton/TextButton'
import ContainedButton from '../../../components/design_system/ContainedButton/ContainedButton'

export interface FiltersModalProps {
  title: string
}


const showListingsMessage = (n: number) =>
  `Show ${n.toLocaleString()} ${n === 1 ? 'Home' : 'Homes'}`

const FiltersModal: NextPage<FiltersModalProps> = ({
  title
}) => {
  const dispatch = useAppDispatch()
  const modalOpen = useAppSelector(selectModalOpen)
  const totalListings = useAppSelector(selectTotalListings)

  const handleClose = () => dispatch(closeModal())

  return (
    <Modal
      isOpen={modalOpen}
      contentLabel='Filters'
      fullScreenOnMobile={true}
      onRequestClose={handleClose}
    >
      <ModalHeader title={title} onClose={handleClose} />
      <ModalBody>
        <More />
      </ModalBody>
      <ModalFooter>
        <TextButton onClick={handleClose}>Clear All</TextButton>
        <ContainedButton onClick={handleClose}>
          {showListingsMessage(totalListings)}
        </ContainedButton>
      </ModalFooter>
    </Modal>
  )
}

export default FiltersModal
