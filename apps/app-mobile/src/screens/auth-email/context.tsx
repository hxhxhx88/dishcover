import type { StoreApi, UseBoundStore } from 'zustand'
import { createContext, use } from 'react'
import { create, useStore as useStore_ } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface State {
  email: string
  setEmail: (email: string) => void
}

export function createStore(): UseBoundStore<StoreApi<State>> {
  return create(
    immer<State>((set) => {
      return {
        email: '',
        setEmail(email: string) {
          set((s) => {
            s.email = email
          })
        },
      }
    }),
  )
}

export const StoreContext = createContext<ReturnType<typeof createStore>>(undefined!)

export function useStore<U>(selector: (state: State) => U): U {
  const store = use(StoreContext)

  return useStore_(store, selector)
}
