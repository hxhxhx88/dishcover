import type { JSX } from 'react'
import { Stack } from 'expo-router'
import { ScreenAlertUpgrade } from '@/screens/alert-upgrade'

export default function Screen(): JSX.Element {
  return (
    <>
      <ScreenAlertUpgrade />
      <Stack.Screen options={{ headerShown: false }} />
    </>
  )
}
