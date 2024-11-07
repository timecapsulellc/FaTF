import { chain } from "../src/utils/chain";
import { client } from "../src/utils/client";
import { getContract } from "thirdweb";
import { stakingABI } from "./stakingABI";

const nftContractAddress = "0xE4637e7425A2d19c4f7A23A36a1f5f844872e6c5";
const rewardTokenContractAddress = "0xf9b864b6d7B2f6348f6adDE5557c676f14FB53e8";
const stakingContractAddress = "0x6A39b9404606e82a70bFb281f36737C018C1335F";

const chainConfig = {
    id: chain.chainId,
    rpc: chain.rpc[0],
    testnet: true as const,
    chain: chain.chain,
    chainId: chain.chainId,
    name: chain.name,
    nativeCurrency: chain.nativeCurrency,
    shortName: chain.shortName,
    slug: chain.slug,
    faucets: [] as string[],
    explorers: [...chain.explorers]
};

export const NFT_CONTRACT = getContract({
    client: client,
    chain: chainConfig,
    address: nftContractAddress
});

export const REWARD_TOKEN_CONTRACT = getContract({
    client: client,
    chain: chainConfig,
    address: rewardTokenContractAddress
});

export const STAKING_CONTRACT = getContract({
    client: client,
    chain: chainConfig,
    address: stakingContractAddress,
    abi: stakingABI
});
