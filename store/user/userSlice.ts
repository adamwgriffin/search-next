import type { PayloadAction } from '@reduxjs/toolkit'
import type { AppState } from '..'
import type { User } from '@prisma/client'
import { createSelector } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from '../../lib/http'

export interface UserState {
  currentUser: User | null
  previousFavoriteIds: string[]
}

const initialState: UserState = {
  currentUser: null,
  previousFavoriteIds: []
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

/**
 * Optimistically updates currentUser.favoriteIds with the given listingId. Adds the ID if it doesn't exist, otherwise
 * removes it.
 */
export const toggleFavorite = createAsyncThunk(
  'user/toggleFavorite',
  async (listingId: string, { dispatch, getState }) => {
    const state = getState() as AppState
    if (!state.user.currentUser) return
    dispatch(setPreviousFavoriteIds(state.user.currentUser.favoriteIds))
    if (state.user.currentUser.favoriteIds.includes(listingId)) {
      dispatch(removeFromFavoriteIds(listingId))
      return await http.delete(`/api/favorites/${listingId}`)
    } else {
      dispatch(addToFavoriteIds(listingId))
      return await http.post(`/api/favorites/${listingId}`)
    }
  }
)

export const userSlice = createSlice({
  name: 'user',

  initialState,

  reducers: {
    resetCurrentUser(state) {
      state.currentUser = initialState.currentUser
    },

    setPreviousFavoriteIds(state, action: PayloadAction<string[]>) {
      state.previousFavoriteIds = action.payload
    },

    addToFavoriteIds(state, action: PayloadAction<string>) {
      if (!state.currentUser) return
      state.currentUser.favoriteIds = state.currentUser.favoriteIds.concat(
        action.payload
      )
    },

    removeFromFavoriteIds(state, action: PayloadAction<string>) {
      if (!state.currentUser) return
      state.currentUser.favoriteIds = state.currentUser.favoriteIds.filter(
        (id) => id !== action.payload
      )
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })

    // if the request to add the favorite fails for some reason, undo the optimistic update that added it to
    // currentUser.favoriteIds.
    builder.addCase(toggleFavorite.rejected, (state, action) => {
      console.error(action.error)
      if (!state.currentUser) return
      state.currentUser.favoriteIds = state.previousFavoriteIds
    })
  }
})

export const {
  resetCurrentUser,
  setPreviousFavoriteIds,
  addToFavoriteIds,
  removeFromFavoriteIds
} = userSlice.actions

export const selectCurrentUser = (state: AppState): User | null =>
  state.user.currentUser

export const selectFavoriteIds = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser?.favoriteIds || []
)

export default userSlice.reducer
