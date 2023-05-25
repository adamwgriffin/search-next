import type { AppState } from '..'
import type { IListingDetail } from '../../lib/types/listing_types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import http from '../../lib/http'

export interface ListingDetailState {
  searchListingsResponse: IListingDetail | null
}

const initialState: ListingDetailState = {
  searchListingsResponse: null
}

export const getListingDetail = createAsyncThunk(
  'listingDetail/getListingDetail',
  async (listingID: string | string[] | undefined, { getState }) => {
    const state = getState() as AppState
    const response = await http({
      url: `/api/listing_detail/${listingID}`
    })
    return response.data
  }
)

export const listingDetailSlice = createSlice({
  name: 'listingDetail',

  initialState,

  reducers: {
    resetListingDetail(state) {
      state.searchListingsResponse = initialState.searchListingsResponse
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getListingDetail.fulfilled, (state, action) => {
      state.searchListingsResponse = action.payload
    })
  }
})

// add any reducers that we want to export as actions here
export const { resetListingDetail } = listingDetailSlice.actions

export const selectListing = (state: AppState): IListingDetail | null =>
  state.listingDetail.searchListingsResponse

export default listingDetailSlice.reducer
