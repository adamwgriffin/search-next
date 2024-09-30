import type { AppState } from '..'
import type { ListingDetail } from '../../types/listing_types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from '../../lib/store_helpers'
import http from '../../lib/http'

export interface ListingDetailState {
  listing: ListingDetail | null
}

const initialState: ListingDetailState = {
  listing: null
}

export const getListingDetail = createAppAsyncThunk<ListingDetail, string>(
  'listingDetail/getListingDetail',
  async (listingID) => {
    const response = await http.get<ListingDetail>(
      `/api/listing_detail/${listingID}`
    )
    return response.data
  }
)

export const listingDetailSlice = createSlice({
  name: 'listingDetail',

  initialState,

  reducers: {
    resetListingDetail(state) {
      state.listing = initialState.listing
    },

    listingFoundForAddressSearch(state, action: PayloadAction<ListingDetail>) {
      state.listing = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getListingDetail.fulfilled, (state, action) => {
      state.listing = action.payload
    })
  }
})

// add any reducers that we want to export as actions here
export const { resetListingDetail, listingFoundForAddressSearch } =
  listingDetailSlice.actions

export const selectListing = (state: AppState): ListingDetailState['listing'] =>
  state.listingDetail.listing

export default listingDetailSlice.reducer
