import type { NextPage } from 'next'
import type { ModalType } from '../../../store/application/applicationSlice'
import { selectModal } from '../../../store/application/applicationSlice'
import { useAppSelector } from '../../../hooks'
import FiltersModal from '../FiltersModal/FiltersModal'
import SaveSearchModal from '../SaveSearchModal/SaveSearchModal'
import ErrorModal from '../ErrorModal/ErrorModal'
import ListingDetailModal from '../ListingDetailModal/ListingDetailModal'

export type ModalComponentTypes = Record<ModalType, NextPage<any>>

const ModalComponents: ModalComponentTypes = {
  filters: FiltersModal,
  saveSearch: SaveSearchModal,
  error: ErrorModal,
  listingDetail: ListingDetailModal
}

const ModalRoot: NextPage= () => {
  const { modalType, modalProps } = useAppSelector(selectModal)
  if (!modalType) return null
  const SpecificModal = ModalComponents[modalType]
  return <SpecificModal {...modalProps} />
}

export default ModalRoot
