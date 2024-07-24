import type { PayloadAction } from '@reduxjs/toolkit'
import type { AppState } from '..'
import type { User, SavedSearch } from '@prisma/client'
import type { Listing } from '../../lib/types/listing_types'
import type { ListingServiceParams } from '../../lib/types/listing_service_params_types'
import type { DefaultAPIResponse } from '../../lib/types'
import type { GetListingsByIdsResponse } from '../../pages/api/listings/[listing_ids]'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from '../../lib/store_helpers'
import http from '../../lib/http'

export type SavedSearchData = Omit<SavedSearch, 'createdAt' | 'updatedAt' | 'searchParams'> & {
  createdAt: string
  updatedAt: string
  searchParams: ListingServiceParams
}

export type CreateSavedSearchData = Omit<SavedSearchData, 'id' | 'createdAt' | 'updatedAt'>

export type CurrentUser = Pick<User, 'id' | 'name' | 'email' | 'image' | 'favoriteIds'>

export type UserState = {
  currentUser: CurrentUser | null
  previousFavoriteIds: string[]
  favoriteListings: Listing[]
  getFavoriteListingsLoading: boolean
  savedSearches: SavedSearchData[]
}

const initialState: UserState = {
  currentUser: null,
  previousFavoriteIds: [],
  favoriteListings: [],
  getFavoriteListingsLoading: false,
  savedSearches: []
}

export const getCurrentUser = createAppAsyncThunk<UserState['currentUser'] | null>(
  'user/getCurrentUser',
  async () => {
    const res = await http.get<UserState['currentUser']>('/api/current_user')
    return res.data
  }
)

/**
 * Optimistically updates currentUser.favoriteIds with the given listingId. Adds the ID if it doesn't exist, otherwise
 * removes it.
 */
export const toggleFavorite = createAppAsyncThunk<DefaultAPIResponse, Listing['_id']>(
  'user/toggleFavorite',
  async (listingId, { dispatch, getState }) => {
    const state = getState()
    if (!state.user.currentUser) return
    dispatch(setPreviousFavoriteIds(state.user.currentUser.favoriteIds))
    if (state.user.currentUser.favoriteIds.includes(listingId)) {
      dispatch(removeFromFavoriteIds(listingId))
      return (await http.delete(`/api/favorites/${listingId}`)).data
    } else {
      dispatch(addToFavoriteIds(listingId))
      return (await http.post(`/api/favorites/${listingId}`)).data
    }
  }
)

export const getFavoriteListings = createAppAsyncThunk<GetListingsByIdsResponse>(
  'user/getFavoriteListings',
  async (_arg, { getState, rejectWithValue }) => {
    const state = getState()
    if (!state.user.currentUser) {
      return rejectWithValue("Can't get favorites because currentUser is null")
    }
    const res = await http.get<GetListingsByIdsResponse>(`/api/listings/${state.user.currentUser.favoriteIds}`)
    return res.data
  }
)

export const createSavedSearch = createAppAsyncThunk<SavedSearchData, CreateSavedSearchData>(
  'user/createSavedSearch',
  async (newSavedSearchData) => {
    const res = await http.post<SavedSearchData>(
      '/api/saved_search',
      newSavedSearchData
    )
    return res.data
  }
)

export const getSavedSearches = createAppAsyncThunk<SavedSearchData[], User['id']>(
  'user/getSavedSearches',
  async (userId) => {
    const res = await http.get(`/api/saved_searches/${userId}`)
    return res.data
  }
)

export const updateSavedSearch = createAppAsyncThunk<DefaultAPIResponse, Partial<SavedSearchData>>(
  'user/createSavedSearch',
  async (updatedSavedSearch) => {
    const res = await http.put<DefaultAPIResponse>(
      '/api/saved_search',
      updatedSavedSearch
    )
    return res.data
  }
)

export const deleteSavedSearch = createAppAsyncThunk<DefaultAPIResponse, void>(
  'user/createSavedSearch',
  async () => {
    const res = await http.delete<DefaultAPIResponse>('/api/saved_search')
    return res.data
  }
)

export const userSlice = createSlice({
  name: 'user',

  initialState,

  reducers: {
    resetCurrentUser(state) {
      state.currentUser = initialState.currentUser
    },

    setPreviousFavoriteIds(state, action: PayloadAction<Listing['_id'][]>) {
      state.previousFavoriteIds = action.payload
    },

    addToFavoriteIds(state, action: PayloadAction<Listing['_id']>) {
      if (!state.currentUser) return
      state.currentUser.favoriteIds.push(action.payload)
    },

    removeFromFavoriteIds(state, action: PayloadAction<Listing['_id']>) {
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

    builder.addCase(getFavoriteListings.pending, (state) => {
      state.getFavoriteListingsLoading = true
    })

    builder.addCase(
      getFavoriteListings.fulfilled,
      (state, action) => {
        state.getFavoriteListingsLoading = false
        state.favoriteListings = action.payload.listings
      }
    )

    builder.addCase(getFavoriteListings.rejected, (state) => {
      state.getFavoriteListingsLoading = false
    })

    // if the request to add the favorite fails for some reason, undo the optimistic update that added it to
    // currentUser.favoriteIds.
    builder.addCase(toggleFavorite.rejected, (state, action) => {
      console.error(action.error)
      if (!state.currentUser) return
      state.currentUser.favoriteIds = state.previousFavoriteIds
    })

    builder.addCase(getSavedSearches.fulfilled, (state, action) => {
      state.savedSearches = action.payload
    })
  }
})

export const {
  resetCurrentUser,
  setPreviousFavoriteIds,
  addToFavoriteIds,
  removeFromFavoriteIds
} = userSlice.actions

export const selectCurrentUser = (state: AppState) =>
  state.user.currentUser

export const selectFavoriteIds = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser?.favoriteIds || []
)

export const selectFavoriteListings = (state: AppState) =>
  state.user.favoriteListings

export const selectGetFavoriteListingsLoading = (state: AppState) =>
  state.user.getFavoriteListingsLoading

export default userSlice.reducer
