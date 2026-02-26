import { use, useEffect } from 'react'
import { catchError } from '@/lib/error'
import { saveAppState } from '@/local-storage/app-state'
import { StoreContext } from './context'

export function AutoSaver(): null {
  const store = use(StoreContext)

  useEffect(() => {
    return store.subscribe(({ values }) => {
      saveAppState(values).catch(catchError)
    })
  }, [store])

  return null
}
