import type { ThunkAction, Action } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import environmentReducer from './environment/environmentSlice'
import applicationReducer from './application/applicationSlice'
import listingSearchReducer from './listingSearch/listingSearchSlice'
import listingDetailReducer from './listingDetail/listingDetailSlice'
import listingMapReducer from './listingMap/listingMapSlice'
import placesReducer from './places/placesSlice'
import errorReducer from './error/errorSlice'

export function makeStore() {
  return configureStore({
    reducer: {
      environment: environmentReducer,
      application: applicationReducer,
      listingSearch: listingSearchReducer,
      listingDetail: listingDetailReducer,
      listingMap: listingMapReducer,
      places: placesReducer,
      error: errorReducer
    },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
