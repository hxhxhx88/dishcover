import { Camera } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import { Linking } from 'react-native'

export type PermissionStatus = 'granted' | 'denied' | 'undetermined'

function mapStatus(status: string): PermissionStatus {
  if (status === 'granted')
    return 'granted'
  if (status === 'undetermined')
    return 'undetermined'
  return 'denied'
}

export async function checkCameraPermission(): Promise<PermissionStatus> {
  const { status } = await Camera.getCameraPermissionsAsync()
  return mapStatus(status)
}

export async function requestCameraPermission(): Promise<PermissionStatus> {
  const { status } = await Camera.requestCameraPermissionsAsync()
  return mapStatus(status)
}

export async function checkGalleryPermission(): Promise<PermissionStatus> {
  const { status } = await ImagePicker.getMediaLibraryPermissionsAsync()
  return mapStatus(status)
}

export async function requestGalleryPermission(): Promise<PermissionStatus> {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
  return mapStatus(status)
}

export async function openAppSettings(): Promise<void> {
  await Linking.openSettings()
}
