import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface EnvironmentState {
  company_uuid: string
  locale: string
}

const initialState: EnvironmentState = {
  company_uuid: process.env.NEXT_PUBLIC_COMPANY_UUID!,
  locale: process.env.NEXT_PUBLIC_LOCALE!
}

export const environmentSlice = createSlice({
  name: 'environment',

  initialState,

  reducers: {
    setEnvironment: (state, action: PayloadAction<EnvironmentState>) => {
      Object.assign(state, action.payload)
    }
  }
})

export const { setEnvironment } = environmentSlice.actions

export default environmentSlice.reducer
