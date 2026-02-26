import type { JSX } from 'react'
import { Trans, useLingui } from '@lingui/react/macro'
import { LoadingWrapper } from '@repo/ui-mobile/loading-wrapper'
import { Text } from '@repo/ui-mobile/primitives/text'
import { PressableScale } from 'pressto'
import { useEffect, useState } from 'react'
import { toast } from 'sonner-native'
import { usePostOtpV1Send } from '@/generated/api-client'
import { useProps, useStore } from './context'

const countdownSec = 60

export function ButtonReseond(): JSX.Element {
  const { t } = useLingui()
  const { email } = useProps()

  // count down
  const [countdown, setCountdown] = useState(countdownSec)

  useEffect(() => {
    if (countdown === 0) {
      return
    }
    const t = setTimeout(() => {
      setCountdown(countdown - 1)
    }, 1000)
    return () => clearTimeout(t)
  }, [countdown])

  const isDisabled = countdown > 0

  const setPublicCode = useStore(s => s.setPublicCode)
  const { mutate: sendOtp, isPending } = usePostOtpV1Send({
    mutation: {
      onSuccess({ data }) {
        setPublicCode(data.publicCode)

        toast.success(t`A new code has been sent to ${email}.`)
        setCountdown(countdownSec)
      },
    },
  })

  return (
    <PressableScale
      enabled={!isDisabled}
      onPress={() => {
        sendOtp({ data: { type: 'sign-in', email } })
      }}
    >
      <LoadingWrapper isLoading={isPending}>
        <Text className={isDisabled || isPending ? 'text-muted-foreground opacity-50' : 'text-primary'}>
          <Trans>Resend code</Trans>
          {' '}
          {isDisabled ? `(${countdown})` : ''}
        </Text>
      </LoadingWrapper>
    </PressableScale>
  )
}
