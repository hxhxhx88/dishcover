'use client'

import type { JSX, ReactNode } from 'react'
import { toast } from '@repo/ui-web/primitives/sonner'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useCallback, useRef } from 'react'

interface Prop {
  readonly children: ReactNode
}

export function ReactQueryProvider({ children }: Prop): JSX.Element {
  const onError = useCallback((...args: unknown[]) => {
    console.error(args)

    toast.error(`Something is wrong. Please try again later.`)
  }, [])

  const clientRef = useRef(
    new QueryClient({
      queryCache: new QueryCache({ onError }),
      mutationCache: new MutationCache({ onError }),
    }),
  )

  return <QueryClientProvider client={clientRef.current}>{children}</QueryClientProvider>
}
