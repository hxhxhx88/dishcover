import type { JSX } from 'react'
import { Trans } from '@lingui/react/macro'
import { Text } from '@repo/ui-mobile/primitives/text'
import { Link } from 'expo-router'
import { View } from 'react-native'
import { env } from '@/lib/env'

export function Footer(): JSX.Element {
  return (
    <View>
      <Text className="text-muted-foreground text-xs">
        <Trans>
          By continuing, you agree to our
          {' '}
          <Link href={`${env.API_ORIGIN}/service-terms`}>
            <Text className="text-muted-foreground text-xs underline">Terms of service</Text>
          </Link>
          {' '}
          and
          {' '}
          <Link href={`${env.API_ORIGIN}/privacy-policy`}>
            <Text className="text-muted-foreground text-xs underline">Privacy policy</Text>
          </Link>
          .
        </Trans>
      </Text>
    </View>
  )
}
