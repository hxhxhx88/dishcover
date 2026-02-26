import type { JSX } from 'react'
import { Trans } from '@lingui/react/macro'
import { Button } from '@repo/ui-web/primitives/button'
import { setupI18n } from '@/lib/i18n'

export default async function Page({ params }: PageProps<'/[locale]'>): Promise<JSX.Element> {
  const { locale } = await params
  await setupI18n(locale)

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Button><Trans>Hello</Trans></Button>
    </div>
  )
}
