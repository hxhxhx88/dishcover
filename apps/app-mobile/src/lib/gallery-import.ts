import * as ImagePicker from 'expo-image-picker'

import { compressImage } from '@/lib/image-compression'

export async function importFromGallery(
  maxCount: number,
): Promise<{ uri: string, fileSize: number }[] | null> {
  const result = await ImagePicker.launchImageLibraryAsync({
    allowsMultipleSelection: true,
    mediaTypes: ['images'],
    selectionLimit: maxCount,
  })

  if (result.canceled) {
    return null
  }

  const compressed = await Promise.all(
    result.assets.map(asset => compressImage(asset.uri)),
  )

  return compressed
}
