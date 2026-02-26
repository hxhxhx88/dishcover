import type { MenuPage } from '@/types/menu-capture'

import axios from 'axios'
import { apiPrefix, makeSignatureHeaders } from '@/lib/api'
import { env } from '@/lib/env'

export type MenuCaptureResult
  = | { status: 'ok', menu: unknown }
    | { status: 'error', code: 'non_menu' | 'server_error', message: string }

export async function submitMenuCapture(pages: MenuPage[]): Promise<MenuCaptureResult> {
  const path = '/menu-capture/submit'

  const formData = new FormData()
  for (const [index, page] of pages.entries()) {
    // React Native FormData accepts objects with uri/name/type
    // eslint-disable-next-line ts/consistent-type-assertions
    const file = {
      uri: page.uri,
      name: `page_${index}.jpg`,
      type: 'image/jpeg',
    } as unknown as Blob
    formData.append(`page_${index}`, file)
  }

  try {
    const response = await axios.post<MenuCaptureResult>(
      `${env.API_ORIGIN}${apiPrefix}${path}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...makeSignatureHeaders(path),
        },
      },
    )

    return response.data
  }
  catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      // eslint-disable-next-line ts/consistent-type-assertions
      const data = error.response.data as { code?: string, message?: string }
      if (data.code === 'non_menu') {
        return { status: 'error', code: 'non_menu', message: data.message ?? 'Not a menu image' }
      }
    }
    return { status: 'error', code: 'server_error', message: 'Failed to submit menu capture' }
  }
}
