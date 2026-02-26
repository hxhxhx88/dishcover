import type { JSX } from 'react'
import { useLingui } from '@lingui/react/macro'
import { Stack } from 'expo-router'
import { ScreenAuthEmail } from '@/screens/auth-email'

export default function Screen(): JSX.Element {
  const { t } = useLingui()

  return (
    <>
      <Stack.Screen options={{ headerShown: false, title: t`Email` }} />
      <ScreenAuthEmail />
    </>
  )
}
