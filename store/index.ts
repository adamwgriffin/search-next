import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import environmentReducer from './environment/environmentSlice'
import listingSearchReducer from './listingSearch/listingSearchSlice'
import listingMapReducer from './listingMap/listingMapSlice'
import placesReducer from './places/placesSlice'

export function makeStore() {
  return configureStore({
    reducer: {
      environment: environmentReducer,
      listingSearch: listingSearchReducer,
      listingMap: listingMapReducer,
      places: placesReducer
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
