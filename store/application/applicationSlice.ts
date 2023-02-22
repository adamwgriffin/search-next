import type { AppState } from '..'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ModalType, ModalPropsTypes } from '../../containers/Modal/Modal'
import { createSlice } from '@reduxjs/toolkit'

export type ViewType = 'list' | 'map'

export interface ApplicationState {
  viewType: ViewType
  modalType?: ModalType | null
  modalProps?: ModalPropsTypes
  modalOpen?: boolean
}

// TODO: use this state to display error messages to the user once UI has been created for this
const initialState: ApplicationState = {
  viewType: 'list',
  modalType: null,
  modalProps: null,
  modalOpen: false
}

export const applicationSlice = createSlice({
  name: 'application',

  initialState,

  reducers: {
    setViewType(state, action: PayloadAction<ViewType>) {
      state.viewType = action.payload
    },

    openModal(state, action: PayloadAction<{ modalType: ModalType; modalProps: ModalPropsTypes }>) {
      state.modalType = action.payload.modalType
      state.modalProps = action.payload.modalProps
      state.modalOpen = true
    },

    closeModal(state) {
      state.modalOpen = false
    }
  }
})

export const { setViewType, openModal, closeModal } = applicationSlice.actions

export const selectViewType = (state: AppState) => state.application.viewType

export const selectModal = (state: AppState) => ({
  modalType: state.application.modalType,
  modalProps: state.application.modalProps,
  modalOpen: state.application.modalOpen
})

export default applicationSlice.reducer
