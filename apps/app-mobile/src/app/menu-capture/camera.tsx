import type { JSX } from 'react'
import { Trans } from '@lingui/react/macro'
import { Text } from '@repo/ui-mobile/primitives/text'
import { CameraView } from 'expo-camera'
import { useRouter } from 'expo-router'
import { useRef, useState } from 'react'
import { Pressable, View } from 'react-native'

import { useMenuCapture } from '@/hooks/use-menu-capture'
import { compressImage } from '@/lib/image-compression'
import { MAX_PAGES } from '@/types/menu-capture'

export default function CameraScreen(): JSX.Element {
  const router = useRouter()
  const { pages, addPage, canAddMore } = useMenuCapture()
  const cameraRef = useRef<CameraView>(null)
  const [torch, setTorch] = useState<'off' | 'on'>('off')
  const [capturing, setCapturing] = useState(false)

  const handleShutter = async (): Promise<void> => {
    if (!canAddMore || capturing)
      return
    setCapturing(true)
    try {
      const photo = await cameraRef.current?.takePictureAsync()
      if (photo) {
        const compressed = await compressImage(photo.uri)
        addPage(compressed.uri, compressed.fileSize)
        router.push('/menu-capture/preview')
      }
    }
    finally {
      setCapturing(false)
    }
  }

  return (
    <View className="flex-1 bg-black">
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing="back"
        enableTorch={torch === 'on'}
      >
        {/* Top bar */}
        <View className="flex-row items-center justify-between px-4 pt-14">
          {/* Page count badge */}
          <View className="rounded-full bg-black/50 px-3 py-1">
            <Text className="text-sm text-white">
              {pages.length}
              {' '}
              /
              {MAX_PAGES}
            </Text>
          </View>

          <View className="flex-row gap-4">
            {/* Flash toggle */}
            <Pressable
              onPress={() => setTorch(prev => (prev === 'off' ? 'on' : 'off'))}
              className="rounded-full bg-black/50 px-3 py-1"
            >
              <Text className="text-sm text-white">
                {torch === 'on' ? '⚡' : '⚡️'}
              </Text>
            </Pressable>

            {/* Close button */}
            <Pressable
              onPress={() => router.back()}
              className="rounded-full bg-black/50 px-3 py-1"
            >
              <Text className="text-sm text-white">✕</Text>
            </Pressable>
          </View>
        </View>

        {/* Shutter button */}
        <View className="absolute bottom-12 left-0 right-0 items-center">
          <Pressable
            onPress={handleShutter}
            disabled={!canAddMore || capturing}
            className="h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-white/30"
            style={(!canAddMore || capturing) ? { opacity: 0.4 } : undefined}
          >
            <View className="h-16 w-16 rounded-full bg-white" />
          </Pressable>
          {!canAddMore && (
            <Text className="mt-2 text-sm text-white">
              <Trans>Maximum pages reached</Trans>
            </Text>
          )}
        </View>
      </CameraView>
    </View>
  )
}
