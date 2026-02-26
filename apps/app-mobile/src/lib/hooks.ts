import { useCallback } from 'react'
import { useAppStore } from '@/providers/app'

export function useIsSignedIn(): boolean {
  return useAppStore(s => Boolean(s.values.accessToken))
}

export function useSignOut(): { signOut: () => Promise<void> } {
  const updateAppState = useAppStore(s => s.updateAppState)

  const signOut = useCallback(async () => {
    updateAppState({
      accessToken: undefined,
      refreshToken: undefined,
    })
  }, [updateAppState])

  return { signOut }
}
