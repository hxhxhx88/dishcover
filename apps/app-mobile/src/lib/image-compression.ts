import { manipulateAsync, SaveFormat } from 'expo-image-manipulator'
import { Image } from 'react-native'

import { JPEG_QUALITY, MAX_FILE_SIZE_BYTES, MAX_LONG_EDGE } from '@/types/menu-capture'

async function getImageDimensions(uri: string): Promise<{ width: number, height: number }> {
  return new Promise((resolve, reject) => {
    Image.getSize(
      uri,
      (width, height) => resolve({ width, height }),
      reject,
    )
  })
}

export async function compressImage(uri: string): Promise<{ uri: string, fileSize: number }> {
  const { width, height } = await getImageDimensions(uri)
  const longEdge = Math.max(width, height)

  const actions = longEdge > MAX_LONG_EDGE
    ? [{ resize: longEdge === width ? { width: MAX_LONG_EDGE } : { height: MAX_LONG_EDGE } }]
    : []

  const result = await manipulateAsync(uri, actions, {
    compress: JPEG_QUALITY,
    format: SaveFormat.JPEG,
  })

  const response = await fetch(result.uri)
  const blob = await response.blob()

  if (blob.size > MAX_FILE_SIZE_BYTES) {
    const retry = await manipulateAsync(uri, actions, {
      compress: 0.7,
      format: SaveFormat.JPEG,
    })

    const retryResponse = await fetch(retry.uri)
    const retryBlob = await retryResponse.blob()

    return { uri: retry.uri, fileSize: retryBlob.size }
  }

  return { uri: result.uri, fileSize: blob.size }
}
