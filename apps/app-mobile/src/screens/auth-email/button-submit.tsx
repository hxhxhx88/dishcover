import type { JSX } from 'react'
import { Trans, useLingui } from '@lingui/react/macro'
import { LoadingButton } from '@repo/ui-mobile/loading-button'
import { Text } from '@repo/ui-mobile/primitives/text'
import { useRouter } from 'expo-router'
import { toast } from 'sonner-native'
import z from 'zod'
import { usePostOtpV1Send } from '@/generated/api-client'
import { useStore } from './context'

export function ButtonSubmit(): JSX.Element {
  const { t } = useLingui()
  const router = useRouter()

  const email = useStore(state => state.email)
  const { mutate: sendOtp, isPending } = usePostOtpV1Send({
    mutation: {
      onSuccess(resp) {
        router.push({
          pathname: '/auth/code',
          params: { publicCode: resp.data.publicCode, email },
        })
      },
    },
  })

  return (
    <LoadingButton
      testID="button-continue"
      isLoading={isPending}
      className="w-full"
      onPress={() => {
        if (!email) {
          toast.warning(t`Please enter your email.`)
          return
        }

        if (z.email().safeParse(email).error) {
          toast.warning(t`Please enter a valid email.`)
          return
        }

        sendOtp({ data: { type: 'sign-in', email } })
      }}
    >
      <Text>
        <Trans>Continue</Trans>
      </Text>
    </LoadingButton>
  )
}
