import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export function useHrefWithParameters(): { hrefWithParameters: (parameters: Record<string, string>) => string } {
  const pathname = usePathname()
  const searchParameters = useSearchParams()

  return {
    hrefWithParameters: useCallback(
      (parameters: Record<string, string>) => {
        const sp = new URLSearchParams(searchParameters)
        for (const [key, value] of Object.entries(parameters)) {
          sp.set(key, value)
        }

        return `${pathname}?${sp.toString()}`
      },
      [pathname, searchParameters],
    ),
  }
}
