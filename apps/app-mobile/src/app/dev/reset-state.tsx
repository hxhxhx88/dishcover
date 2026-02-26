import type { JSX } from 'react'
import { appStateSchema } from '@repo/lib/schemas/app-mobile-state'
import { Text } from '@repo/ui-mobile/primitives/text'
import { useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { View } from 'react-native'
import z from 'zod'
import { useAppStore } from '@/providers/app'

const searchParametersSchema = z.object({
  stateJson: z.string(),
})

export default function Screen(): JSX.Element {
  const qs = useLocalSearchParams()
  const { stateJson } = searchParametersSchema.parse(qs)
  const state = appStateSchema.parse(JSON.parse(stateJson))
  const resetAppState = useAppStore(s => s.resetAppState)

  useEffect(() => {
    resetAppState(state)
  }, [state, resetAppState])

  return (
    <View className="flex-1 items-center justify-center">
      <Text testID="text-state-reset">
        State reset. Please restart the app.
      </Text>
    </View>
  )
}
