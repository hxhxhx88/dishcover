import type { Theme, ThemeColors } from '@repo/ui-config/colors'
import { colors } from '@repo/ui-config/colors'
import { useColorScheme } from 'react-native'

export function useTheme(): Theme {
  const theme = useColorScheme()

  return theme === 'dark' ? 'dark' : 'light'
}

export function useThemeColors(): ThemeColors {
  const theme = useTheme()

  return theme === 'dark' ? colors.dark : colors.light
}
