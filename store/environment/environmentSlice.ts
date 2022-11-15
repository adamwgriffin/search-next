import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface EnvironmentState {
  company_uuid: string
  agent_uuid: string
  locale: string
}

const initialState: EnvironmentState = {
  company_uuid: '1234567',
  agent_uuid: 'f74a3f6d-aeda-4daa-835e-029386152405',
  locale: 'en-US'
}

export const environmentSlice = createSlice({
  name: 'environment',

  initialState,

  reducers: {
    setEnvironment: (state, action: PayloadAction<EnvironmentState>) => {
      const { company_uuid, agent_uuid } = action.payload
      Object.assign(state, { company_uuid, agent_uuid })
    }
  }
})

export const { setEnvironment } = environmentSlice.actions

export default environmentSlice.reducer
