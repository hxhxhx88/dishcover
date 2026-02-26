import type { JSX, ReactNode } from 'react'
import { useLingui } from '@lingui/react/macro'
import { badRequestSchema } from '@repo/lib/schemas/bad-request'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AxiosError, isAxiosError } from 'axios'
import * as Network from 'expo-network'
import { useRouter } from 'expo-router'
import { useCallback, useRef } from 'react'
import { toast } from 'sonner-native'
import { catchError } from '@/lib/error'

export function ReactQueryProvider({ children }: { children: ReactNode }): JSX.Element {
  const { t } = useLingui()

  const router = useRouter()

  const onError = useCallback(
    async (error: unknown) => {
      if (isAxiosError(error)) {
        if (error.status === 400) {
          const bad = badRequestSchema.safeParse(error.response?.data).data
          if (bad) {
            toast.warning(bad.message)
            return
          }
        }

        if (error.status === 426) {
          router.replace('/alert-upgrade')
          return
        }

        if (error.code === AxiosError.ERR_NETWORK) {
          const state = await Network.getNetworkStateAsync()
          if (!state.isConnected || state.isInternetReachable === false) {
            toast.error(t`No internet connection.`)
            return
          }
        }
      }

      if (error instanceof Error) {
        catchError({ name: error.name, message: error.message })
      }
      else {
        catchError({ error: JSON.stringify(error) })
      }

      toast.error(t`Something is wrong. Please try again later.`)
    },
    [router, t],
  )

  const clientRef = useRef(
    new QueryClient({
      queryCache: new QueryCache({ onError }),
      mutationCache: new MutationCache({ onError }),
    }),
  )

  return <QueryClientProvider client={clientRef.current}>{children}</QueryClientProvider>
}
