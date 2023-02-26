import type { NextPage } from 'next'
import formStyles from '../../../styles/forms.module.css'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import {
  selectModalOpen,
  closeModal
} from '../../../store/application/applicationSlice'
import Modal from '../../../components/design_system/modal/Modal/Modal'
import ModalHeader from '../../../components/design_system/modal/ModalHeader/ModalHeader'
import ModalBody from '../../../components/design_system/modal/ModalBody/ModalBody'
import ModalFooter from '../../../components/design_system/modal/ModalFooter/ModalFooter'
import TextButton from '../../../components/design_system/TextButton/TextButton'
import ContainedButton from '../../../components/design_system/ContainedButton/ContainedButton'

export interface SaveSearchModalProps {
  title: string
}

const SaveSearchModal: NextPage<SaveSearchModalProps> = ({ title }) => {
  const dispatch = useAppDispatch()
  const modalOpen = useAppSelector(selectModalOpen)

  const handleClose = () => dispatch(closeModal())

  return (
    <Modal
      isOpen={modalOpen}
      contentLabel='Save Search'
      onRequestClose={handleClose}
    >
      <ModalHeader title={title} onClose={handleClose} />
      <ModalBody>
        <div className={formStyles.inputGroup}>
          <label htmlFor='searchName' className={formStyles.label}>
            Name
          </label>
          <input id='searchName' type='text' className={formStyles.input} />
        </div>
        <div className={formStyles.inputGroup}>
          <label htmlFor='emailMe' className={formStyles.label}>
            Email Me
          </label>
          <select id='emailMe' className={formStyles.select}>
            <option value='instantly'>Instantly</option>
            <option value='weekly'>Weekly</option>
            <option value='never'>Never</option>
          </select>
        </div>
      </ModalBody>
      <ModalFooter>
        <TextButton onClick={handleClose}>Cancel</TextButton>
        <ContainedButton onClick={handleClose}>Save</ContainedButton>
      </ModalFooter>
    </Modal>
  )
}

export default SaveSearchModal
