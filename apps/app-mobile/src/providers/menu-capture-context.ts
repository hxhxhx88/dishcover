import type { MenuPage } from '@/types/menu-capture'
import { createContext } from 'react'

export interface MenuCaptureContextValue {
  pages: MenuPage[]
  addPage: (uri: string, fileSize: number) => void
  removePage: (id: string) => void
  reorderPages: (from: number, to: number) => void
  clearPages: () => void
  canAddMore: boolean
  canSubmit: boolean
}

export const MenuCaptureContext = createContext<MenuCaptureContextValue | null>(null)
