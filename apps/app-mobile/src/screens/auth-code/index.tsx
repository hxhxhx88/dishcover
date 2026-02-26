import type { JSX } from 'react'
import type { Props, StateValues } from './context'
import { useHeaderHeight } from '@react-navigation/elements'
import { useMemo } from 'react'
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createStore, PropsContext, StoreContext } from './context'
import { Render } from './render'

export function ScreenAuthCode({ publicCode, ...props }: Props & StateValues): JSX.Element {
  const headerHeight = useHeaderHeight()
  const store = useMemo(() => createStore({ publicCode }), [publicCode])
  return (
    <PropsContext value={props}>
      <StoreContext value={store}>
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} keyboardVerticalOffset={headerHeight}>
            <Render />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </StoreContext>
    </PropsContext>
  )
}
