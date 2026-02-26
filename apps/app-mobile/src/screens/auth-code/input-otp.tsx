import type { JSX } from 'react'
import { Trans, useLingui } from '@lingui/react/macro'
import { useThemeColors } from '@repo/ui-mobile/lib/theme'
import { Text } from '@repo/ui-mobile/primitives/text'
import { useNavigation } from 'expo-router'
import { ActivityIndicator, View } from 'react-native'
import { OtpInput } from 'react-native-otp-entry'
import { toast } from 'sonner-native'
import { usePostOtpV1VerifySignIn } from '@/generated/api-client'
import { useAppStore } from '@/providers/app'
import { useProps, useStore } from './context'

const digitsCount = 6

export function InputOtp(): JSX.Element {
  const { t } = useLingui()

  const { email } = useProps()
  const publicCode = useStore(s => s.publicCode)

  const updateAppState = useAppStore(s => s.updateAppState)

  const colors = useThemeColors()

  const navigation = useNavigation()
  const { mutate: verifyOtp, isPending: isPendingVerifyOtp } = usePostOtpV1VerifySignIn({
    mutation: {
      onSuccess(resp) {
        updateAppState({
          accessToken: resp.data.accessToken,
          refreshToken: resp.data.refreshToken,
        })
        toast.success(t`Welcome!`)
        navigation.getParent()?.goBack() // dismiss the auth modal
      },
    },
  })

  return (
    <View className="flex-1 items-center justify-center gap-8">
      <View className="items-center">
        <Text className="text-muted-foreground" testID="text-otp-description">
          <Trans>
            We sent a
            {' '}
            {digitsCount}
            -digit code to your email
          </Trans>
        </Text>
        <Text className="font-medium">{email}</Text>
      </View>

      <OtpInput
        autoFocus
        disabled={isPendingVerifyOtp}
        type="numeric"
        focusColor={colors.primary}
        textProps={{ style: { color: colors.foreground } }}
        numberOfDigits={digitsCount}
        onTextChange={(code) => {
          if (code.length !== digitsCount) {
            return
          }

          verifyOtp({ data: { publicCode, privateCode: code } })
        }}
      />

      <ActivityIndicator className={isPendingVerifyOtp ? '' : 'opacity-0'} />
    </View>
  )
}
