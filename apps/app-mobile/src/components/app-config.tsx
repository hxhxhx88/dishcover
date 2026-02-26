import axios from 'axios'
import { useEffect } from 'react'
import { apiPrefix, makeSignatureHeaders, useGlobalApiHeaders } from '@/lib/api'
import { env } from '@/lib/env'
import { useAppStore } from '@/providers/app'

export function AppConfig(): undefined {
  const globalHeaders = useGlobalApiHeaders()

  const apiOrigin = useAppStore(s => s.values.apiOrigin) ?? env.API_ORIGIN

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

    return () => {
      axios.interceptors.request.eject(requestId)
    }
  }, [])

  return undefined
}
