import type { AppState as AppStateValues } from '@repo/lib/schemas/app-mobile-state'
import type { StoreApi, UseBoundStore } from 'zustand'
import { createContext, use } from 'react'
import { create, useStore as useStore_ } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface AppState {
  values: AppStateValues
  updateAppState: (state: AppStateValues) => void
  resetAppState: (state: AppStateValues) => void
}

export function createStore(initialState: AppStateValues): UseBoundStore<StoreApi<AppState>> {
  return create(
    immer<AppState>((set) => {
      return {
        values: initialState,
        updateAppState(update) {
          set((s) => {
            s.values = { ...s.values, ...update }
          })
        },
        resetAppState(newState) {
          set((s) => {
            s.values = newState
          })
        },
      }
    }),
  )
}

export const StoreContext = createContext<ReturnType<typeof createStore>>(undefined!)

export function useStore<U>(selector: (state: AppState) => U): U {
  const store = use(StoreContext)

  return useStore_(store, selector)
}

export function useStoreOnce<U>(selector: (state: AppState) => U): U {
  const store = use(StoreContext)

  return selector(store.getState())
}
