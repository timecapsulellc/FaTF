import { chain } from "../src/app/chain";
import { client } from "../src/app/client";
import { getContract } from "thirdweb";
import { stakingABI } from "./stakingABI";

const nftContractAddress = "0xE4637e7425A2d19c4f7A23A36a1f5f844872e6c5";
const rewardTokenContractAddress = "0xf9b864b6d7B2f6348f6adDE5557c676f14FB53e8";
const stakingContractAddress = "0x6A39b9404606e82a70bFb281f36737C018C1335F";

export const NFT_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: nftContractAddress
});

export const REWARD_TOKEN_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: rewardTokenContractAddress
});

export const STAKING_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: stakingContractAddress,
    abi: stakingABI
});
