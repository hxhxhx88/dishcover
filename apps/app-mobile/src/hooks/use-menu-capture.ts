import type { MenuCaptureContextValue } from '@/providers/menu-capture-context'

import { MenuCaptureContext } from '@/providers/menu-capture-context'

export function useMenuCapture(): MenuCaptureContextValue {
  const context = use(MenuCaptureContext)
  if (!context) {
    throw new Error('useMenuCapture must be used within a MenuCaptureProvider')
  }
  return context
}
