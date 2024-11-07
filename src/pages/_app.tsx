import type { AppProps } from 'next/app'
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Avalanche } from "@thirdweb-dev/chains";
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      activeChain={Avalanche}
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
      supportedChains={[Avalanche]}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  )
}
