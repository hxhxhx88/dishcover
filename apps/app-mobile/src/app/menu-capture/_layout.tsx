import type { JSX } from 'react'
import { Stack } from 'expo-router'

import { MenuCaptureProvider } from '@/providers/menu-capture'

export default function MenuCaptureLayout(): JSX.Element {
  return (
    <MenuCaptureProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </MenuCaptureProvider>
  )
}
