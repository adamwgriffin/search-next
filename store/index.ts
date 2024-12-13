import { configureStore } from '@reduxjs/toolkit'
import filtersReducer from './filters/filtersSlice'
import applicationReducer from './application/applicationSlice'
import listingSearchReducer from './listingSearch/listingSearchSlice'
import listingDetailReducer from './listingDetail/listingDetailSlice'
import listingMapReducer from './listingMap/listingMapSlice'
import autocompleteReducer from './autocomplete/autocompleteSlice'
import errorReducer from './error/errorSlice'
import userReducer from './user/userSlice'
import { listingDetailApi } from './listingDetail/listingDetailSlice'

export function makeStore() {
  return configureStore({
    reducer: {
      application: applicationReducer,
      listingSearch: listingSearchReducer,
      filters: filtersReducer,
      listingDetail: listingDetailReducer,
      listingMap: listingMapReducer,
      autocomplete: autocompleteReducer,
      error: errorReducer,
      user: userReducer,
      [listingDetailApi.reducerPath]: listingDetailApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(listingDetailApi.middleware)
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
