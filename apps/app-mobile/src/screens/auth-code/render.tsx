import type { JSX } from 'react'
import { Trans } from '@lingui/react/macro'
import { Text } from '@repo/ui-mobile/primitives/text'
import { View } from 'react-native'
import { ButtonReseond } from './button-resend'
import { InputOtp } from './input-otp'

export function Render(): JSX.Element {
  return (
    <View className="flex-1 items-center justify-between gap-4 p-4">
      <InputOtp />
      <Footer />
    </View>
  )
}

function Footer(): JSX.Element {
  return (
    <View className="items-center justify-center">
      <Text className="text-muted-foreground">
        <Trans>Did not receive the code?</Trans>
      </Text>
      <ButtonReseond />
    </View>
  )
}
