import { createSlice, createDraftSafeSelector, PayloadAction } from '@reduxjs/toolkit'

export interface ServiceUrlComponents {
  serviceBase: string
  serviceVersion: string
}

export interface EnvironmentState extends ServiceUrlComponents{
  company_uuid: string
  agent_uuid: string
  locale: string
}

const initialState: EnvironmentState = {
  serviceBase: 'https://svc-qa.moxiworks.com',
  serviceVersion: 'v1',
  company_uuid: '1234567',
  agent_uuid: 'f74a3f6d-aeda-4daa-835e-029386152405',
  locale: 'en-US'
}

export const environmentSlice = createSlice({
  name: 'environment',

  initialState,

  reducers: {
    setEnvironment: (state, action: PayloadAction<EnvironmentState>) => {
      const { serviceBase, serviceVersion, company_uuid, agent_uuid } = action.payload
      Object.assign(state, { serviceBase, serviceVersion, company_uuid, agent_uuid })
    }
  }
})

export const { setEnvironment } = environmentSlice.actions

export const selectServiceUrlComponents = (state: EnvironmentState) => {
  const { serviceBase, serviceVersion } = state
  return { serviceBase, serviceVersion }
}


export const selectBaseUrl = createDraftSafeSelector(
  selectServiceUrlComponents,
  (state: ServiceUrlComponents) => `${state.serviceBase}/service/${state.serviceVersion}`
)

export default environmentSlice.reducer
