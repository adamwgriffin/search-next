import type { AppState } from '..'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import http from '../../lib/http'
import { ListingDetailListing } from '../../lib/types/listing_types'

export interface ListingDetailState {
  searchListingsResponse: any
}

const initialState: ListingDetailState = {
  searchListingsResponse: {}
}

export const getListingDetail = createAsyncThunk(
  'listingDetail/getListingDetail',
  async (listingID: string | string[] | undefined, { getState }) => {
    const state = getState() as AppState
    const response = await http({
      url: `/api/listing_detail/${listingID}`,
      params: selectParamsForListingDetailRequest(state)
    })
    return response.data.data
  }
)

export const listingDetailSlice = createSlice({
  name: 'listingDetail',

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getListingDetail.fulfilled, (state, action) => {
      state.searchListingsResponse = action.payload
    })
  }
})

// add any reducers that we want to export as actions here
export const {} = listingDetailSlice.actions

export const selectParamsForListingDetailRequest = (state: AppState) => {
  return {
    company_uuid: state.environment.company_uuid,
    include_non_image: true
  }
}

export const selectListing = (state: AppState): ListingDetailListing =>
  state.listingDetail.searchListingsResponse.result_list?.[0]

export default listingDetailSlice.reducer
