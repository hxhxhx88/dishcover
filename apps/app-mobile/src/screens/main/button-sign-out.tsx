import type { JSX } from 'react'
import { Trans } from '@lingui/react/macro'
import { LoadingButton } from '@repo/ui-mobile/loading-button'
import { Text } from '@repo/ui-mobile/primitives/text'
import { usePostMeV1SignOut } from '@/generated/api-client'
import { useSignOut } from '@/lib/hooks'

export function ButtonSignOut(): JSX.Element {
  const { signOut } = useSignOut()
  const { mutate, isPending } = usePostMeV1SignOut({
    mutation: {
      onSuccess() {
        signOut()
      },
    },
  })

  return (
    <LoadingButton testID="button-sign-out" isLoading={isPending} onPress={() => { mutate() }} buttonClassName="bg-secondary">
      <Text className="text-secondary-foreground"><Trans>Sign out</Trans></Text>
    </LoadingButton>
  )
}
