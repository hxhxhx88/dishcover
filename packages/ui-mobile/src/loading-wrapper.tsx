import type { JSX, ReactNode } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { cn } from './lib/utils'

interface Props {
  children: ReactNode
  isLoading?: boolean
  className?: string
}

export function LoadingWrapper({ isLoading, className, children }: Props): JSX.Element {
  return (
    <View className={cn('relative w-full', className)}>
      {children}
      {isLoading
        ? (
            <View className="absolute top-0 right-0 bottom-0 left-0 items-center justify-center">
              <ActivityIndicator />
            </View>
          )
        : null}
    </View>
  )
}
