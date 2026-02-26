import type { JSX } from 'react'
import { useLingui } from '@lingui/react/macro'
import { Redirect, Stack, useLocalSearchParams } from 'expo-router'
import z from 'zod'
import { ScreenAuthCode } from '@/screens/auth-code'

const searchParametersSchema = z.object({
  publicCode: z.string(),
  email: z.email(),
})

export default function Screen(): JSX.Element {
  const { t } = useLingui()

  const qs = useLocalSearchParams()
  const parsed = searchParametersSchema.safeParse(qs)

  if (!parsed.success) {
    return <Redirect href="/" />
  }

  const { publicCode, email } = parsed.data

  return (
    <>
      <Stack.Screen options={{ headerTransparent: true, headerTitle: t`OTP verification` }} />
      <ScreenAuthCode publicCode={publicCode} email={email} />
    </>
  )
}
