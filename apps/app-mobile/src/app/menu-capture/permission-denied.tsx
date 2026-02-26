import type { JSX } from 'react'
import { Trans } from '@lingui/react/macro'
import { Button } from '@repo/ui-mobile/primitives/button'
import { Text } from '@repo/ui-mobile/primitives/text'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { View } from 'react-native'

import { openAppSettings } from '@/lib/permissions'

export default function PermissionDeniedScreen(): JSX.Element {
  const router = useRouter()
  const { type } = useLocalSearchParams<{ type: 'camera' | 'gallery' }>()

  const isCamera = type === 'camera'

  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Text className="mb-6 text-center text-2xl font-bold">
        {isCamera
          ? <Trans>Camera Access Required</Trans>
          : <Trans>Photo Library Access Required</Trans>}
      </Text>

      <View className="mb-8 w-full gap-4">
        <Text className="text-base text-muted-foreground">
          <Trans>1. Open your device Settings</Trans>
        </Text>
        <Text className="text-base text-muted-foreground">
          <Trans>2. Find DishCover in the app list</Trans>
        </Text>
        <Text className="text-base text-muted-foreground">
          {isCamera
            ? <Trans>3. Enable Camera access</Trans>
            : <Trans>3. Enable Photo Library access</Trans>}
        </Text>
      </View>

      <View className="w-full gap-3">
        <Button onPress={openAppSettings}>
          <Text>
            <Trans>Open Settings</Trans>
          </Text>
        </Button>
        <Button variant="outline" onPress={() => router.back()}>
          <Text>
            <Trans>Go Back</Trans>
          </Text>
        </Button>
      </View>
    </View>
  )
}
