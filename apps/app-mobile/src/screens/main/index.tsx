import type { JSX } from 'react'
import { Text } from '@repo/ui-mobile/primitives/text'
import { View } from 'react-native'

export function ScreenMain(): JSX.Element {
  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <Text>DishCover</Text>
    </View>
  )
}
