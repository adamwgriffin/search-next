import type { NextPage } from 'next'
import styles from './SaveSearchModal.module.css'
import formStyles from '../../../styles/forms.module.css'
import ReactModal from 'react-modal'
import TextButton from '../../design_system/TextButton/TextButton'
import ContainedButton from '../../design_system/ContainedButton/ContainedButton'
import CloseIcon from '../../design_system/icons/CloseIcon/CloseIcon'

export interface SaveSearchModalProps {
  modalOpen: boolean
  title: string
  onClose: () => void
}

ReactModal.setAppElement('#__next')

const SaveSearchModal: NextPage<SaveSearchModalProps> = ({
  modalOpen,
  title,
  onClose
}) => {
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
      onRequestClose={onClose}
      closeTimeoutMS={500}
    >
      <header className={styles.header}>
        <button className={styles.closeButton} onClick={onClose}>
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
        <TextButton onClick={onClose}>Cancel</TextButton>
        <ContainedButton onClick={onClose}>Save</ContainedButton>
      </footer>
    </ReactModal>
  )
}

export default SaveSearchModal
