import type { AppState } from '@repo/lib/schemas/app-mobile-state'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { appStateSchema } from '@repo/lib/schemas/app-mobile-state'
import * as secureStore from 'expo-secure-store'
import { catchError } from '@/lib/error'

const KEY_STORE = `app-state`

// On iOS, data stored with `expo-secure-store` will persist across app uninstallations when the app is reinstalled with the same bundle ID. To prevent loading previous state, we use `AsyncStorage` to store a flag.
// - https://docs.expo.dev/versions/latest/sdk/securestore/#ios
const KEY_HAS_LAUNCHED = 'has-launched'

const defaultState: AppState = {
  accessToken: undefined,
  refreshToken: undefined,
}

export async function saveAppState(state: AppState): Promise<void> {
  return secureStore.setItemAsync(KEY_STORE, JSON.stringify(state))
}

export async function clearAppState(): Promise<void> {
  return secureStore.deleteItemAsync(KEY_STORE)
}

export async function loadAppState(): Promise<AppState> {
  const hasLaunched = await AsyncStorage.getItem(KEY_HAS_LAUNCHED)
  if (!hasLaunched) {
    // It is the first time the app is launched.
    await clearAppState()
    await AsyncStorage.setItem(KEY_HAS_LAUNCHED, 'true')

    return defaultState
  }

  const raw = await secureStore.getItemAsync(KEY_STORE)

  if (!raw) {
    return defaultState
  }

  try {
    return appStateSchema.parse(JSON.parse(raw))
  }
  catch (error) {
    catchError(error)
    clearAppState().catch(catchError)

    return defaultState
  }
}
