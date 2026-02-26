import type { JSX } from 'react'
import { useLingui } from '@lingui/react/macro'
import { Input } from '@repo/ui-mobile/primitives/input'
import { useStore } from './context'

export function InputEmail(): JSX.Element {
  const { t } = useLingui()

  const email = useStore(state => state.email)
  const setEmail = useStore(state => state.setEmail)

  return (
    <Input
      testID="input-email"
      autoFocus
      className="w-full"
      placeholder={t`Enter your email`}
      textAlignVertical="center"
      textAlign="center"
      keyboardType="email-address"
      autoCapitalize="none"
      autoComplete="email"
      autoCorrect={false}
      returnKeyType="done"
      value={email}
      onChangeText={setEmail}
    />
  )
}
