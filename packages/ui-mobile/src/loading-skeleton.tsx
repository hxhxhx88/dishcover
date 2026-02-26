import type { JSX } from 'react'
import type { ViewProps } from 'react-native'
import { Skeleton } from '@repo/ui-mobile/primitives/skeleton'
import { View } from 'react-native'
import { cn } from './lib/utils'

interface Props extends ViewProps {
  className?: string
}

export function LoadingSkeleton({ className, ...props }: Props): JSX.Element {
  return (
    <View className={cn('flex gap-4', className)} {...props}>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-9/12" />
      <Skeleton className="h-4 w-6/12" />
    </View>
  )
}
