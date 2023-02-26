import type { NextPage } from 'next'
import type { ReactNode } from 'react'
import styles from './Modal.module.css'
import ReactModal from 'react-modal'

export interface ModalProps {
  isOpen: boolean
  contentLabel: string
  closeTimeoutMS?: number
  fullScreenOnMobile?: boolean
  children: ReactNode
  onRequestClose?: () => void
}

ReactModal.setAppElement('#__next')

const Modal: NextPage<ModalProps> = ({
  isOpen = false,
  contentLabel,
  closeTimeoutMS = 500,
  fullScreenOnMobile = false,
  children,
  onRequestClose
}) => {
  const modalContentClassNameBase = fullScreenOnMobile
    ? styles.modalContentFullScreenOnMobile
    : styles.modalContent
  const modalOverlayClassNameBase = fullScreenOnMobile
    ? styles.modalOverlayFullScreenOnMobile
    : styles.modalOverlay

  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel={contentLabel}
      overlayClassName={{
        base: modalOverlayClassNameBase,
        afterOpen: styles.modalOverlayAfterOpen,
        beforeClose: styles.modalOverlayBeforeClose
      }}
      className={{
        base: modalContentClassNameBase,
        afterOpen: styles.modalContentAfterOpen,
        beforeClose: styles.modalContentBeforeClose
      }}
      onRequestClose={onRequestClose}
      closeTimeoutMS={closeTimeoutMS}
    >
      {children}
    </ReactModal>
  )
}

export default Modal
