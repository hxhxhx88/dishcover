import type { JSX } from 'react'
import { Trans, useLingui } from '@lingui/react/macro'
import { Button } from '@repo/ui-mobile/primitives/button'
import { Text } from '@repo/ui-mobile/primitives/text'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  View,
} from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

import { useMenuCapture } from '@/hooks/use-menu-capture'
import { importFromGallery } from '@/lib/gallery-import'
import { submitMenuCapture } from '@/lib/menu-capture-api'
import { MAX_PAGES } from '@/types/menu-capture'

const THUMB_SIZE = 80
const THUMB_GAP = 8

function DraggableThumbnail({
  uri,
  index,
  isSelected,
  onSelect,
  onRemove,
  onReorder,
}: {
  uri: string
  index: number
  isSelected: boolean
  onSelect: () => void
  onRemove: () => void
  onReorder: (from: number, to: number) => void
}): JSX.Element {
  const translateX = useSharedValue(0)

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX
    })
    .onEnd((e) => {
      const offset = Math.round(e.translationX / (THUMB_SIZE + THUMB_GAP))
      if (offset !== 0) {
        const to = Math.max(0, index + offset)
        runOnJS(onReorder)(index, to)
      }
      translateX.value = withSpring(0)
    })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    zIndex: translateX.value !== 0 ? 100 : 0,
  }))

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          {
            width: THUMB_SIZE,
            height: THUMB_SIZE,
            marginRight: THUMB_GAP,
          },
          animatedStyle,
        ]}
      >
        <Pressable onPress={onSelect}>
          <Image
            source={{ uri }}
            style={{
              width: THUMB_SIZE,
              height: THUMB_SIZE,
              borderRadius: 8,
              borderWidth: isSelected ? 2 : 0,
              borderColor: '#3b82f6',
            }}
          />
        </Pressable>
        <Pressable
          onPress={onRemove}
          className="absolute -right-1 -top-1 h-5 w-5 items-center justify-center rounded-full bg-red-500"
        >
          <Text className="text-xs text-white">✕</Text>
        </Pressable>
      </Animated.View>
    </GestureDetector>
  )
}

export default function PreviewScreen(): JSX.Element {
  const router = useRouter()
  const { t } = useLingui()
  const { source } = useLocalSearchParams<{ source?: string }>()
  const { pages, addPage, removePage, reorderPages, canAddMore, canSubmit } = useMenuCapture()
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const galleryImportedRef = useRef(false)

  // Trigger gallery import on mount if navigated from gallery CTA
  useEffect(() => {
    if (source !== 'gallery' || galleryImportedRef.current)
      return
    galleryImportedRef.current = true

    void importFromGallery(MAX_PAGES).then((images) => {
      if (images) {
        for (const img of images) {
          addPage(img.uri, img.fileSize)
        }
      }
    })
  }, [source, addPage])

  const displayIndex = selectedIndex !== null && selectedIndex < pages.length
    ? selectedIndex
    : pages.length - 1

  const currentPage = pages[displayIndex]

  const handleSubmit = useCallback(async () => {
    if (!canSubmit)
      return
    setSubmitting(true)
    try {
      const result = await submitMenuCapture(pages)
      if (result.status === 'ok') {
        Alert.alert(t`Success`, t`Menu submitted successfully`)
        router.dismissAll()
      }
      else {
        Alert.alert(t`Error`, result.message)
      }
    }
    catch {
      Alert.alert(t`Error`, t`Failed to submit menu`)
    }
    finally {
      setSubmitting(false)
    }
  }, [canSubmit, pages, router, t])

  if (pages.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="mb-4 text-lg">
          <Trans>No pages captured yet</Trans>
        </Text>
        <Button onPress={() => router.back()}>
          <Text>
            <Trans>Go Back</Trans>
          </Text>
        </Button>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-background">
      {/* Full-size preview */}
      <View className="flex-1">
        {currentPage && (
          <Image
            source={{ uri: currentPage.uri }}
            style={{ flex: 1 }}
            resizeMode="contain"
          />
        )}
      </View>

      {/* Thumbnail strip */}
      <View className="border-t border-border bg-card px-4 pb-8 pt-3">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {pages.map((page, index) => (
            <DraggableThumbnail
              key={page.id}
              uri={page.uri}
              index={index}
              isSelected={index === displayIndex}
              onSelect={() => setSelectedIndex(index)}
              onRemove={() => {
                removePage(page.id)
                if (selectedIndex !== null && selectedIndex >= pages.length - 1) {
                  setSelectedIndex(null)
                }
              }}
              onReorder={reorderPages}
            />
          ))}
        </ScrollView>

        {/* Action buttons */}
        <View className="mt-3 flex-row gap-3">
          {canAddMore && (
            <Button
              variant="outline"
              className="flex-1"
              onPress={() => router.push('/menu-capture/camera')}
            >
              <Text>
                <Trans>Add More</Trans>
              </Text>
            </Button>
          )}
          <Button
            className="flex-1"
            disabled={!canSubmit || submitting}
            onPress={handleSubmit}
          >
            {submitting
              ? <ActivityIndicator color="white" size="small" />
              : (
                  <Text>
                    <Trans>Submit</Trans>
                  </Text>
                )}
          </Button>
        </View>
      </View>
    </View>
  )
}
