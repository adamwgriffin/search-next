import type { NextPage } from 'next'
import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import {
  selectModalOpen,
  closeModal
} from '../../../store/application/applicationSlice'
import Modal from '../../../components/design_system/modal/Modal/Modal'
import ModalHeader from '../../../components/design_system/modal/ModalHeader/ModalHeader'
import ModalBody from '../../../components/design_system/modal/ModalBody/ModalBody'
import LoginOrRegisterForm from '../../../components/form/LoginOrRegisterForm/LoginOrRegisterForm'

export interface LoginOrRegisterModalProps {
  title: string
}

const LoginOrRegisterModal: NextPage<LoginOrRegisterModalProps> = ({
  title
}) => {
  const dispatch = useAppDispatch()
  const modalOpen = useAppSelector(selectModalOpen)

  const handleClose = useCallback(() => dispatch(closeModal()), [dispatch])

  return (
    <Modal
      isOpen={modalOpen}
      contentLabel='Login'
      onRequestClose={handleClose}
    >
      <ModalHeader title={title} onClose={handleClose} />
      <ModalBody>
        <LoginOrRegisterForm />
      </ModalBody>
    </Modal>
  )
}

export default LoginOrRegisterModal
