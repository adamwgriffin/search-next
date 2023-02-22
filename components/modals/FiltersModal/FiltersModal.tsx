import type { NextPage } from 'next'
import styles from './FiltersModal.module.css'
import ReactModal from 'react-modal'

export interface FiltersModalProps {
  modalOpen: boolean
  title: string
}

ReactModal.setAppElement('#__next')

const FiltersModal: NextPage<FiltersModalProps> = ({ modalOpen, title }) => {
  return (
    <ReactModal
      isOpen={modalOpen}
      contentLabel='Filters'
      className={styles.Content}
      overlayClassName={styles.Overlay}
    >
      <div>
        <h1 className={styles.title}>{title}</h1>
        <p>Filters</p>
      </div>
    </ReactModal>
  )
}

export default FiltersModal
