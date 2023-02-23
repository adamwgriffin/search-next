import type { NextPage } from 'next'
import styles from './SaveSearchModal.module.css'
import formStyles from '../../../styles/forms.module.css'
import ReactModal from 'react-modal'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { selectModalOpen, closeModal } from '../../../store/application/applicationSlice'
import TextButton from '../../../components/design_system/TextButton/TextButton'
import ContainedButton from '../../../components/design_system/ContainedButton/ContainedButton'
import CloseIcon from '../../../components/design_system/icons/CloseIcon/CloseIcon'

export interface SaveSearchModalProps {
  title: string
}

ReactModal.setAppElement('#__next')

const SaveSearchModal: NextPage<SaveSearchModalProps> = ({
  title,
}) => {
  const dispatch = useAppDispatch()
  const modalOpen = useAppSelector(selectModalOpen)

  const handleClose = () => {
    dispatch(closeModal())
  }

  return (
    <ReactModal
      isOpen={modalOpen}
      contentLabel='Save Search'
      overlayClassName={{
        base: styles.modalOverlay,
        afterOpen: styles.modalOverlayAfterOpen,
        beforeClose: styles.modalOverlayBeforeClose
      }}
      className={{
        base: styles.modalContent,
        afterOpen: styles.modalContentAfterOpen,
        beforeClose: styles.modalContentBeforeClose
      }}
      onRequestClose={handleClose}
      closeTimeoutMS={500}
    >
      <header className={styles.header}>
        <button className={styles.closeButton} onClick={handleClose}>
          <CloseIcon />
        </button>
        <h1 className={styles.title}>{title}</h1>
      </header>
      <div className={styles.body}>
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
      </div>
      <footer className={styles.footer}>
        <TextButton onClick={handleClose}>Cancel</TextButton>
        <ContainedButton onClick={handleClose}>Save</ContainedButton>
      </footer>
    </ReactModal>
  )
}

export default SaveSearchModal
