import type { StoreApi, UseBoundStore } from 'zustand'
import { createContext, use } from 'react'
import { create, useStore as useStore_ } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface StateValues {
  publicCode: string
}

export interface State extends StateValues {
  setPublicCode: (publicCode: string) => void
}

export function createStore(initialState: StateValues): UseBoundStore<StoreApi<State>> {
  return create(
    immer<State>((set) => {
      return {
        ...initialState,
        setPublicCode(publicCode: string) {
          set((s) => {
            s.publicCode = publicCode
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

export interface Props {
  email: string
}

export const PropsContext = createContext<Props>(undefined!)

export function useProps(): Props {
  return use(PropsContext)
}
