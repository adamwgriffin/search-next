import type { AppState } from '..'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export type ViewType = 'list' | 'map'

export interface ApplicationState {
  viewType: ViewType
}

// TODO: use this state to display error messages to the user once UI has been created for this
const initialState: ApplicationState = {
  viewType: 'list'
}

export const applicationSlice = createSlice({
  name: 'application',

  initialState,

  reducers: {
    setViewType(state, action: PayloadAction<ViewType>) {
      state.viewType = action.payload
    }
  }
})

export const { setViewType } = applicationSlice.actions

export const selectViewType = (state: AppState) => state.application.viewType

export default applicationSlice.reducer
