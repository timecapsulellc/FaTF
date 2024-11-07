import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fat Frogs Kingdom',
  description: 'NFT Staking Platform for Fat Frogs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-[#0f1318] text-white">
          {children}
        </main>
      </body>
    </html>
  )
}
