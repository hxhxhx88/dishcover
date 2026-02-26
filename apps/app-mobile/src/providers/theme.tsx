import type { Theme } from '@react-navigation/native'
import type { JSX, ReactNode } from 'react'
import { DarkTheme, DefaultTheme, ThemeProvider as ThemeProviderNative } from '@react-navigation/native'
import { oklchToHsl } from '@repo/lib/colors'
import { colors } from '@repo/ui-config/colors'
import { useTheme } from '@repo/ui-mobile/lib/theme'

// `@react-navigation/native` does not support `oklch` colors, so we need to convert them to `hsl`.
const darkTheme: Theme = {
  ...DarkTheme,
  colors: {
    background: oklchToHsl(colors.dark.background),
    border: oklchToHsl(colors.dark.border),
    card: oklchToHsl(colors.dark.card),
    notification: oklchToHsl(colors.dark.destructive),
    primary: oklchToHsl(colors.dark.primary),
    text: oklchToHsl(colors.dark.foreground),
  },
}

const lightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    background: oklchToHsl(colors.light.background),
    border: oklchToHsl(colors.light.border),
    card: oklchToHsl(colors.light.card),
    notification: oklchToHsl(colors.light.destructive),
    primary: oklchToHsl(colors.light.primary),
    text: oklchToHsl(colors.light.foreground),
  },
}

export function ThemeProvider({ children }: { children: ReactNode }): JSX.Element {
  const theme = useTheme()

  return <ThemeProviderNative value={theme === 'dark' ? darkTheme : lightTheme}>{children}</ThemeProviderNative>
}
