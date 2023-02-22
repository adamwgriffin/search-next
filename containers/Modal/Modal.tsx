import type { NextPage } from 'next'
import type { FiltersModalProps } from '../../components/modals/FiltersModal/FiltersModal'
import type { SaveSearchModalProps } from '../../components/modals/SaveSearchModal/SaveSearchModal'
import type { ErrorModalProps } from '../../components/modals/ErrorModal/ErrorModal'
import {
  selectModal,
  closeModal
} from '../../store/application/applicationSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import FiltersModal from '../../components/modals/FiltersModal/FiltersModal'
import SaveSearchModal from '../../components/modals/SaveSearchModal/SaveSearchModal'
import ErrorModal from '../../components/modals/ErrorModal/ErrorModal'

export type ModalType = 'filters' | 'error' | 'saveSearch'
export type ModalPropsTypes =
  | FiltersModalProps
  | SaveSearchModalProps
  | ErrorModalProps
  | null

const ModalComponents: Record<
  ModalType,
  | NextPage<FiltersModalProps>
  | NextPage<SaveSearchModalProps>
  | NextPage<ErrorModalProps>
> = {
  filters: FiltersModal,
  saveSearch: SaveSearchModal,
  error: ErrorModal
}

const Modal: NextPage = () => {
  const dispatch = useAppDispatch()
  const modal = useAppSelector(selectModal)

  const handleOnClose = () => {
    dispatch(closeModal())
  }

  if (!modal.modalType) return null
  const SpecificModal = ModalComponents[modal.modalType]
  const propsMerged = { ...modal.modalProps, modalOpen: modal.modalOpen }
  return (
    // @ts-ignore
    <SpecificModal
      onClose={handleOnClose}
      {...propsMerged}
    />
  )
}

export default Modal
