import { apiHeaders } from '@repo/lib/http'
import axios, { AxiosHeaders, isAxiosError } from 'axios'
import { useEffect, useRef } from 'react'
import { postMeV1Refresh } from '@/generated/api-client'
import { apiPrefix, makeSignatureHeaders, useGlobalApiHeaders } from '@/lib/api'
import { env } from '@/lib/env'
import { useSignOut } from '@/lib/hooks'
import { useAppStore } from '@/providers/app'

declare module 'axios' {
  interface AxiosRequestConfig {
    skipAuthRefresh?: boolean
  }
}

export function AppConfig(): undefined {
  const globalHeaders = useGlobalApiHeaders()

  const apiOrigin = useAppStore(s => s.values.apiOrigin) ?? env.API_ORIGIN
  const refreshToken = useAppStore(s => s.values.refreshToken)
  const updateAppState = useAppStore(s => s.updateAppState)

  const { signOut } = useSignOut()

  // Keep only one refresh request in flight.
  const refreshPromiseRef = useRef<Promise<string | undefined> | null>(null)

  useEffect(() => {
    axios.defaults.baseURL = `${apiOrigin}${apiPrefix}`

    for (const [key, value] of Object.entries(globalHeaders)) {
      axios.defaults.headers.common[key] = value
    }
  }, [globalHeaders, apiOrigin])

  useEffect(() => {
    const requestId = axios.interceptors.request.use((config) => {
      // sign
      const path = config.url ?? ''
      const signatureHeaders = makeSignatureHeaders(path)
      for (const [key, value] of Object.entries(signatureHeaders)) {
        config.headers[key] = value
      }

      return config
    })

    const responseId = axios.interceptors.response.use(
      response => response,
      async (error) => {
        if (!isAxiosError(error)) {
          return Promise.reject(error)
        }

        const status = error.response?.status ?? error.status
        const config = error.config
        // Skip non-401s and any request that has opted out of refresh handling.
        if (status !== 401 || !config || config.skipAuthRefresh) {
          return Promise.reject(error)
        }

        // Without a refresh token, we cannot recover this session.
        if (!refreshToken) {
          await signOut()
          return Promise.reject(error)
        }

        if (!refreshPromiseRef.current) {
          // Use a single shared refresh promise so concurrent 401s do not spam refresh calls.
          refreshPromiseRef.current = postMeV1Refresh(
            { refreshToken },
            { headers: { [apiHeaders.accessToken]: '' }, skipAuthRefresh: true },
          ).then(({ data }) => {
            const { accessToken, refreshToken: nextRefreshToken } = data
            if (!accessToken || !nextRefreshToken) {
              return undefined
            }

            updateAppState({
              accessToken,
              refreshToken: nextRefreshToken,
            })

            return accessToken
          }).catch(() => undefined).finally(() => {
            refreshPromiseRef.current = null
          })
        }

        const nextAccessToken = await refreshPromiseRef.current
        if (!nextAccessToken) {
          await signOut()
          return Promise.reject(error)
        }

        // Mark retried request to avoid entering a refresh loop.
        config.skipAuthRefresh = true
        const headers = AxiosHeaders.from(config.headers)
        headers.set(apiHeaders.accessToken, nextAccessToken)
        config.headers = headers

        return axios.request(config)
      },
    )

    return () => {
      axios.interceptors.request.eject(requestId)
      axios.interceptors.response.eject(responseId)
    }
  }, [refreshToken, signOut, updateAppState])

  return undefined
}
