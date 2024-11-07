'use client';

import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Avalanche } from "@thirdweb-dev/chains";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <ThirdwebProvider
          activeChain={Avalanche}
          clientId="149584c7b4535aef52db119d20cbd442"
        >
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
