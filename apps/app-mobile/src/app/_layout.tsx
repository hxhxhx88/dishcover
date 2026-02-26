import type { JSX } from 'react'
import { useTheme } from '@repo/ui-mobile/lib/theme'
import { cn } from '@repo/ui-mobile/lib/utils'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { Toaster } from 'sonner-native'
import { AppConfig } from '@/components/app-config'
import { AppProvider } from '@/providers/app'
import { I18nProvider } from '@/providers/i18n'
import { ReactQueryProvider } from '@/providers/react-query'
import { ThemeProvider } from '@/providers/theme'

export default function Layout(): JSX.Element {
  const theme = useTheme()

  return (
    <I18nProvider>
      <ThemeProvider>
        <KeyboardProvider>
          <GestureHandlerRootView>
            <AppProvider>
              <ReactQueryProvider>
                <StatusBar style="auto" />
                <AppConfig />
                <View className={cn('flex-1', theme === 'dark' ? 'dark' : '')}>
                  <Stack />
                </View>
                {/* The `Toaster` must be at the very bottom of the tree */}
                <Toaster richColors closeButton position="top-center" />
              </ReactQueryProvider>
            </AppProvider>
          </GestureHandlerRootView>
        </KeyboardProvider>
      </ThemeProvider>
    </I18nProvider>
  )
}
