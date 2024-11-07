import type { Metadata } from 'next'
import './globals.css'
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { chain } from './chain';

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
        <ThirdwebProvider
          activeChain={chain}
          clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
        >
          <main className="min-h-screen bg-[#0f1318] text-white">
            {children}
          </main>
        </ThirdwebProvider>
      </body>
    </html>
  )
}
