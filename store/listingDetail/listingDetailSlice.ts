import type { AppState } from '..'
import type { IListingDetail } from '../../lib/types/listing_types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from '../../lib/http'

export interface ListingDetailState {
  listingServiceResponse: IListingDetail | null
}

const initialState: ListingDetailState = {
  listingServiceResponse: null
}

export const getListingDetail = createAsyncThunk(
  'listingDetail/getListingDetail',
  async (listingID: string | string[] | undefined) => {
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
      state.listingServiceResponse = initialState.listingServiceResponse
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getListingDetail.fulfilled, (state, action) => {
      state.listingServiceResponse = action.payload
    })
  }
})

// add any reducers that we want to export as actions here
export const { resetListingDetail } = listingDetailSlice.actions

export const selectListing = (state: AppState): IListingDetail | null =>
  state.listingDetail.listingServiceResponse

export default listingDetailSlice.reducer
