import type { AppDispatch, AppState } from '../store'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import isEqual from 'lodash/isEqual'
export * from './listing_card'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export const useRunCallbackIfChanged = <T>(
  value: T,
  callback: () => void
): [() => void, () => void] => {
  const [previous, setPrevious] = useState(value)

  const setPreviousFunction = () => {
    setPrevious({ ...value })
  }

  const executeCallbackIfChangedFunction = () => {
    if (!isEqual(previous, value)) {
      callback()
    }
  }

  return [setPreviousFunction, executeCallbackIfChangedFunction]
}
