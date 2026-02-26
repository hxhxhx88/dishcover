import type { JSX } from 'react'
import { Trans } from '@lingui/react/macro'
import { Button } from '@repo/ui-mobile/primitives/button'
import { Text } from '@repo/ui-mobile/primitives/text'
import { useRouter } from 'expo-router'

export function ButtonSignIn(): JSX.Element {
  const router = useRouter()

  return (
    <Button testID="button-sign-in" onPress={() => { router.push('/auth') }} className="bg-secondary">
      <Text className="text-secondary-foreground"><Trans>Sign in</Trans></Text>
    </Button>
  )
}
