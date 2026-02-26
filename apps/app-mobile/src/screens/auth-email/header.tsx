import type { JSX } from 'react'
import { Trans } from '@lingui/react/macro'
import { Text } from '@repo/ui-mobile/primitives/text'
import { View } from 'react-native'

export function Header(): JSX.Element {
  return (
    <View className="flex-1 items-center justify-center gap-4">
      <Text className="text-muted-foreground">
        <Trans>Welcome!</Trans>
      </Text>
    </View>
  )
}
