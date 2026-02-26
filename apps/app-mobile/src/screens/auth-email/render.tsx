import type { JSX } from 'react'
import { View } from 'react-native'
import { ButtonSubmit } from './button-submit'
import { Footer } from './footer'
import { Header } from './header'
import { InputEmail } from './input-email'

export function Render(): JSX.Element {
  return (
    <View className="flex-1 items-center justify-center gap-4 p-4">
      <Header />
      <View className="w-full gap-4">
        <InputEmail />
        <ButtonSubmit />
      </View>
      <Footer />
    </View>
  )
}
