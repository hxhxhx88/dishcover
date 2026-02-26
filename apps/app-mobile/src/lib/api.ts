import { useLingui } from '@lingui/react/macro'
import { apiHeaders, apiSignatureMessage } from '@repo/lib/http'
import { HmacSHA256 as hmacSHA256 } from 'crypto-js'
import * as Application from 'expo-application'
import { getCalendars } from 'expo-localization'
import { env } from '@/lib/env'
import { useAppStore } from '@/providers/app'

export const apiPrefix = '/api'

export function makeSignatureHeaders(path: string): Record<string, string> {
  // sign
  const timestamp = Date.now().toString()
  const messageToSign = apiSignatureMessage(`${apiPrefix}${path}`, timestamp)
  const signature = hmacSHA256(messageToSign, env.API_SECRET).toString()

  return {
    [apiHeaders.signature]: signature,
    [apiHeaders.timestamp]: timestamp,
  }
}

export function useGlobalApiHeaders(): Record<string, string> {
  const {
    i18n: { locale },
  } = useLingui()

  const accessToken = useAppStore(s => s.values.accessToken)
  const databaseUrl = useAppStore(s => s.values.databaseUrl)
  const extraApiHeaders = useAppStore(s => s.values.apiHeaders)

  const timeZone = getCalendars()[0]?.timeZone

  return {
    [apiHeaders.acceptLanguage]: locale,
    [apiHeaders.accessToken]: accessToken ?? '',
    [apiHeaders.version]: Application.nativeApplicationVersion ?? '',
    [apiHeaders.timeZone]: timeZone ?? '',
    [apiHeaders.database]: databaseUrl ?? '',
    ...extraApiHeaders,
  }
}
