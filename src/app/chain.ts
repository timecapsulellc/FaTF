import { Avalanche } from "@thirdweb-dev/chains";

// Create a mutable version of the chain configuration
export const chain = {
    ...Avalanche,
    id: Avalanche.chainId,
    rpc: "https://api.avax.network/ext/bc/C/rpc",
    testnet: true as const,
    faucets: [], // Mutable empty array instead of readonly
    explorers: [...Avalanche.explorers], // Convert readonly array to mutable
    nativeCurrency: { ...Avalanche.nativeCurrency }
};
