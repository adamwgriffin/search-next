import type { AppState } from '..'
import type { ListingDetail } from '../../lib/types/listing_types'
import { createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from '../../lib/store_helpers'
import http from '../../lib/http'

export interface ListingDetailState {
  listingServiceResponse: ListingDetail | null
}

const initialState: ListingDetailState = {
  listingServiceResponse: null
}

export const getListingDetail = createAppAsyncThunk<
  ListingDetail,
  string | string[] | undefined
>('listingDetail/getListingDetail', async (listingID) => {
  const response = await http.get<ListingDetail>(
    `/api/listing_detail/${listingID}`
  )
  return response.data
})

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

export const selectListing = (
  state: AppState
): ListingDetailState['listingServiceResponse'] =>
  state.listingDetail.listingServiceResponse

export default listingDetailSlice.reducer
