import type { LucideIcon, LucideProps } from 'lucide-react-native'
import type { JSX } from 'react'
import { cn } from '@repo/ui-mobile/lib/utils'
import { styled } from 'nativewind'

type IconProps = LucideProps & {
  as: LucideIcon
}

function IconBase({ as: IconComponent, ...props }: IconProps) {
  return <IconComponent {...props} />
}

const StyledIconBase = styled(IconBase, {
  className: {
    target: 'style',
    nativeStyleMapping: {
      height: 'size',
      width: 'size',
    },
  },
})

function Icon({ as: IconComponent, className, size = 20, ...props }: IconProps): JSX.Element {
  return <StyledIconBase as={IconComponent} className={cn('text-foreground', className)} size={size} {...props} />
}

export { Icon }
