import type { JSX } from 'react'
import { useHeaderHeight } from '@react-navigation/elements'
import { useMemo } from 'react'
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { createStore, StoreContext } from './context'
import { Render } from './render'

export function ScreenAuthEmail(): JSX.Element {
  const store = useMemo(() => createStore(), [])
  const { top } = useSafeAreaInsets()
  const headerHeight = useHeaderHeight()

  return (
    <StoreContext value={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} keyboardVerticalOffset={headerHeight + top}>
          <Render />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </StoreContext>
  )
}
