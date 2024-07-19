'use client'

import type { NextPage } from 'next'
import type { ModalType } from '../../../store/application/applicationSlice'
import { selectModalType, selectModalProps } from '../../../store/application/applicationSlice'
import { useAppSelector } from '../../../hooks'
import FiltersModal from '../FiltersModal/FiltersModal'
import SaveSearchModal from '../SaveSearchModal/SaveSearchModal'
import ErrorModal from '../ErrorModal/ErrorModal'
import ListingDetailModal from '../ListingDetailModal/ListingDetailModal'
import LoginOrRegisterModal from '../LoginOrRegisterModal/LoginOrRegisterModal'

export type ModalComponentTypes = Record<ModalType, NextPage<any>>

const ModalComponents: ModalComponentTypes = {
  filters: FiltersModal,
  saveSearch: SaveSearchModal,
  error: ErrorModal,
  listingDetail: ListingDetailModal,
  loginOrRegister: LoginOrRegisterModal
}

const ModalRoot: NextPage = () => {
  const modalType = useAppSelector(selectModalType)
  const modalProps = useAppSelector(selectModalProps)
  if (!modalType) return null
  const SpecificModal = ModalComponents[modalType]
  return <SpecificModal {...modalProps} />
}

export default ModalRoot
