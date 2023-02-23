import type { NextPage } from 'next'
import styles from './FiltersModal.module.css'
import ReactModal from 'react-modal'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { selectModalOpen, closeModal } from '../../../store/application/applicationSlice'

export interface FiltersModalProps {
  title: string
}

ReactModal.setAppElement('#__next')

const FiltersModal: NextPage<FiltersModalProps> = ({ title }) => {
  const dispatch = useAppDispatch()
  const modalOpen = useAppSelector(selectModalOpen)

  const handleClose = () => {
    dispatch(closeModal())
  }

  return (
    <ReactModal
      isOpen={modalOpen}
      contentLabel='Filters'
      className={styles.Content}
      overlayClassName={styles.Overlay}
      onRequestClose={handleClose}
    >
      <div>
        <h1 className={styles.title}>{title}</h1>
        <p>Filters</p>
      </div>
    </ReactModal>
  )
}

export default FiltersModal
