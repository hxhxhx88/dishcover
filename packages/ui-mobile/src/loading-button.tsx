import type { ButtonProps } from '@repo/ui-mobile/primitives/button'
import type { JSX } from 'react'
import { cn } from '@repo/ui-mobile/lib/utils'
import { LoadingWrapper } from '@repo/ui-mobile/loading-wrapper'
import { Button } from '@repo/ui-mobile/primitives/button'
import { View } from 'react-native'

interface Props extends ButtonProps {
  isLoading?: boolean
  buttonClassName?: string
}

export function LoadingButton({ isLoading, disabled, className, buttonClassName, ...props }: Props): JSX.Element {
  return (
    <View className={className}>
      <LoadingWrapper isLoading={isLoading}>
        <Button disabled={disabled ?? isLoading} {...props} className={cn(buttonClassName)} />
      </LoadingWrapper>
    </View>
  )
}
