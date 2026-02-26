import type { JSX } from 'react'
import { View } from 'react-native'
import { useIsSignedIn } from '@/lib/hooks'
import { ButtonSignIn } from './button-sign-in'
import { ButtonSignOut } from './button-sign-out'

export function ScreenMain(): JSX.Element {
  const isSignedIn = useIsSignedIn()

  return (
    <View className="flex-1 items-center justify-center bg-primary">
      {isSignedIn ? <ButtonSignOut /> : <ButtonSignIn />}
    </View>
  )
}
