import type { JSX } from 'react'
import { Trans } from '@lingui/react/macro'
import { Button } from '@repo/ui-mobile/primitives/button'
import { Text } from '@repo/ui-mobile/primitives/text'
import { useRouter } from 'expo-router'
import { useCallback } from 'react'
import { View } from 'react-native'

import {
  checkCameraPermission,
  checkGalleryPermission,
  requestCameraPermission,
  requestGalleryPermission,
} from '@/lib/permissions'

export function ScreenMain(): JSX.Element {
  const router = useRouter()

  const handleScanMenu = useCallback(async () => {
    let status = await checkCameraPermission()
    if (status === 'undetermined') {
      status = await requestCameraPermission()
    }
    if (status === 'granted') {
      router.push('/menu-capture/camera')
    }
    else {
      router.push('/menu-capture/permission-denied?type=camera')
    }
  }, [router])

  const handleImportGallery = useCallback(async () => {
    let status = await checkGalleryPermission()
    if (status === 'undetermined') {
      status = await requestGalleryPermission()
    }
    if (status !== 'granted') {
      router.push('/menu-capture/permission-denied?type=gallery')
      return
    }
    router.push('/menu-capture/preview?source=gallery')
  }, [router])

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-primary px-6">
      <Text className="mb-8 text-3xl font-bold">DishCover</Text>
      <Button className="w-full" onPress={handleScanMenu}>
        <Text>
          <Trans>Scan Menu</Trans>
        </Text>
      </Button>
      <Button variant="outline" className="w-full" onPress={handleImportGallery}>
        <Text>
          <Trans>Import from Gallery</Trans>
        </Text>
      </Button>
    </View>
  )
}
