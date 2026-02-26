import type { MenuCaptureContextValue } from '@/providers/menu-capture-context'
import type { MenuPage } from '@/types/menu-capture'
import { useCallback, useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { MenuCaptureContext } from '@/providers/menu-capture-context'
import { MAX_PAGES, MIN_PAGES } from '@/types/menu-capture'
import 'react-native-get-random-values'

export function MenuCaptureProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [pages, setPages] = useState<MenuPage[]>([])

  const addPage = useCallback((uri: string, fileSize: number) => {
    setPages((prev) => {
      if (prev.length >= MAX_PAGES)
        return prev
      const order = prev.length
      return [...prev, { id: uuidv4(), uri, fileSize, order }]
    })
  }, [])

  const removePage = useCallback((id: string) => {
    setPages(prev =>
      prev
        .filter(p => p.id !== id)
        .map((p, i) => ({ ...p, order: i })),
    )
  }, [])

  const reorderPages = useCallback((from: number, to: number) => {
    setPages((prev) => {
      const next = [...prev]
      const [moved] = next.splice(from, 1)
      if (!moved)
        return prev
      next.splice(to, 0, moved)
      return next.map((p, i) => ({ ...p, order: i }))
    })
  }, [])

  const clearPages = useCallback(() => {
    setPages([])
  }, [])

  const value = useMemo<MenuCaptureContextValue>(() => ({
    pages,
    addPage,
    removePage,
    reorderPages,
    clearPages,
    canAddMore: pages.length < MAX_PAGES,
    canSubmit: pages.length >= MIN_PAGES,
  }), [pages, addPage, removePage, reorderPages, clearPages])

  return (
    <MenuCaptureContext value={value}>
      {children}
    </MenuCaptureContext>
  )
}
