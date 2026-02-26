import type { JSX } from 'react'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { AppLogo } from '@repo/ui-web/app-logo'
import Markdown from 'react-markdown'

export default async function Page({ params }: Readonly<PageProps<'/[locale]'>>): Promise<JSX.Element> {
  const { locale } = await params
  const markdown = await readFile(join(process.cwd(), 'public', 'md', `privacy-policy-${locale}.md`), 'utf8')

  return (
    <div className="prose container mx-auto p-4">
      <div className="mb-8">
        <AppLogo size={64} />
      </div>
      <Markdown>{markdown}</Markdown>
    </div>
  )
}
