import type { AppState } from '@repo/lib/schemas/app-mobile-state'
import type { JSX, ReactNode } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useMemo, useState } from 'react'
import { catchError } from '@/lib/error'
import { loadAppState } from '@/local-storage/app-state'
import { AutoSaver } from './auto-saver'
import { createStore, StoreContext } from './context'

SplashScreen.preventAutoHideAsync().catch(catchError)

interface Props {
  children: ReactNode
}

export function Provider({ children }: Props): JSX.Element | null {
  const [initialState, setInitialState] = useState<AppState | undefined>()

  useEffect(() => {
    loadAppState()
      .then((state) => {
        setInitialState(state)
      })
      .catch(catchError)
  }, [])

  if (!initialState) {
    return null
  }

  return <Loaded state={initialState}>{children}</Loaded>
}

function Loaded({ children, state }: Props & { state: AppState }): JSX.Element {
  const store = useMemo(() => createStore(state), [state])

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <StoreContext value={store}>
      {children}
      <AutoSaver />
    </StoreContext>
  )
}
