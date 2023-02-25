import type { NextPage } from 'next'
import styles from './FiltersModal.module.css'
import ReactModal from 'react-modal'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import {
  selectModalOpen,
  closeModal
} from '../../../store/application/applicationSlice'
import { selectTotalListings } from '../../../store/listingSearch/listingSearchSlice'
import More from '../../More/More'
import CloseIcon from '../../../components/design_system/icons/CloseIcon/CloseIcon'
import TextButton from '../../../components/design_system/TextButton/TextButton'
import ContainedButton from '../../../components/design_system/ContainedButton/ContainedButton'

export interface FiltersModalProps {
  title: string
}

ReactModal.setAppElement('#__next')

const showListingsMessage = (n: number) =>
  `Show ${n.toLocaleString()} ${n === 1 ? 'Home' : 'Homes'}`

const FiltersModal: NextPage<FiltersModalProps> = ({
  title
}) => {
  const dispatch = useAppDispatch()
  const modalOpen = useAppSelector(selectModalOpen)
  const totalListings = useAppSelector(selectTotalListings)

  const handleClose = () => {
    dispatch(closeModal())
  }

  return (
    <ReactModal
      isOpen={modalOpen}
      contentLabel='Filters'
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
        <More />
      </div>
      <footer className={styles.footer}>
        <TextButton onClick={handleClose}>Clear All</TextButton>
        <ContainedButton onClick={handleClose}>
          {showListingsMessage(totalListings)}
        </ContainedButton>
      </footer>
    </ReactModal>
  )
}

export default FiltersModal
