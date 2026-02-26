import type { JSX } from 'react'
import type { GetConfigV1200 } from '@/generated/api-client'
import { Trans } from '@lingui/react/macro'
import { LoadingButton } from '@repo/ui-mobile/loading-button'
import { LoadingSkeleton } from '@repo/ui-mobile/loading-skeleton'
import { Text } from '@repo/ui-mobile/primitives/text'
import { useMutation } from '@tanstack/react-query'
import { ArrowBigUpDashIcon } from 'lucide-react-native'
import { Linking, Platform, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon } from '@/components/icon'
import { useGetConfigV1 } from '@/generated/api-client'

export function ScreenAlertUpgrade(): JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Load />
    </SafeAreaView>
  )
}

function Load(): JSX.Element {
  const { data } = useGetConfigV1()

  if (!data) {
    return <LoadingSkeleton className="p-4" />
  }

  return <Loaded resp={data.data} />
}

function Loaded({ resp }: { resp: GetConfigV1200 }): JSX.Element {
  const { mutate, isPending } = useMutation({
    async mutationFn() {
      if (Platform.OS === 'ios') {
        await Linking.openURL(`https://apps.apple.com/app/id${resp.storeIdIos}`)
        return
      }

      if (Platform.OS === 'android') {
        await Linking.openURL(`https://play.google.com/store/apps/details?id=${resp.storeIdAndroid}`)
        return
      }

      throw new Error('unsupported platform')
    },
  })

  return (
    <View className="flex-1 items-center gap-4 p-4">
      <View className="flex-1 items-center justify-center gap-8">
        <View className="bg-primary/20 h-24 w-24 items-center justify-center rounded-full p-8">
          <Icon as={ArrowBigUpDashIcon} className="text-primary" size={48} />
        </View>
        <View className="gap-2">
          <Text className="text-center text-3xl font-bold">
            <Trans>Update required</Trans>
          </Text>
          <Text className="text-muted-foreground text-center">
            <Trans>
              This version of the app is outdated. Please update to continue using the app with the latest features.
            </Trans>
          </Text>
        </View>
      </View>
      <LoadingButton
        className="w-full"
        isLoading={isPending}
        onPress={() => {
          mutate()
        }}
      >
        <Text>
          <Trans>Update now</Trans>
        </Text>
      </LoadingButton>
    </View>
  )
}
