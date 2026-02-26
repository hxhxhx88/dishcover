import type { Metadata } from 'next'
import type { JSX, ReactNode } from 'react'
import { APP_NAME } from '@repo/metadata'
import { SidebarProvider } from '@repo/ui-web/primitives/sidebar'

import { Toaster } from '@repo/ui-web/primitives/sonner'
import { TooltipProvider } from '@repo/ui-web/primitives/tooltip'
import { Geist, Geist_Mono } from 'next/font/google'
import { AppSidebar } from '@/components/app-sidebar'
import { ReactQueryProvider } from '@/providers/react-query'
import '@/styles/base.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: APP_NAME,
}

interface Props extends LayoutProps<'/'> {
  header: ReactNode
}

export default async function Layout({ children, header }: Props): Promise<JSX.Element> {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReactQueryProvider>
          <TooltipProvider>
            <SidebarProvider>
              <AppSidebar />
              <main className="flex h-screen w-full flex-col overflow-hidden">
                <header className="flex h-12 items-center border-b px-4">{header}</header>
                <div className="flex-1 overflow-auto p-4">{children}</div>
              </main>
              <Toaster richColors />
            </SidebarProvider>
          </TooltipProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
