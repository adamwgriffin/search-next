import type { AppState } from '..'
import type { User } from '@prisma/client'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from '../../lib/http'

export interface UserState {
  currentUser: User | null
}

const initialState: UserState = {
  currentUser: null
}

export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async () => {
    const response = await http({
      url: '/api/current_user'
    })
    return response.data
  }
)

export const userSlice = createSlice({
  name: 'user',

  initialState,

  reducers: {
    resetCurrentUser(state) {
      state.currentUser = initialState.currentUser
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
  }
})

export const { resetCurrentUser } = userSlice.actions

export const selectCurrentUser = (state: AppState): User | null =>
  state.user.currentUser

export default userSlice.reducer
