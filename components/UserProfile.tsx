'use client';

import React from 'react';
import { useAddress, useContract, useContractRead, useBalance } from "@thirdweb-dev/react";
import { STAKING_CONTRACT, NFT_CONTRACT } from "../utils/contracts";
import { ethers } from "ethers";

export const UserProfile = () => {
    const address = useAddress();
    const { contract: stakingContract } = useContract(STAKING_CONTRACT.address);
    const { contract: nftContract } = useContract(NFT_CONTRACT.address);
    
    const { data: stakeInfo } = useContractRead(
        stakingContract,
        "getStakeInfo",
        [address || ""]
    );

    const { data: walletBalance } = useBalance();

    const formatAddress = (addr: string) => {
        if (!addr) return "";
        return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
    };

    const getStakedCount = () => {
        if (!stakeInfo || !stakeInfo[0]) return 0;
        return stakeInfo[0].length;
    };

    const formatRewards = () => {
        if (!stakeInfo || !stakeInfo[1]) return "0";
        try {
            return ethers.utils.formatEther(stakeInfo[1].toString());
        } catch (error) {
            return "0";
        }
    };

    return (
        <div style={{
            backgroundColor: "rgba(20, 25, 25, 0.7)",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
            {/* Header */}
            <div style={{
                padding: "24px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
            }}>
                <h2 style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#fff",
                    margin: "0 0 8px 0"
                }}>Your Profile</h2>
                <p style={{
                    color: "#888",
                    fontSize: "14px",
                    margin: 0
                }}>{formatAddress(address || "")}</p>
            </div>

            {/* Stats */}
            <div style={{
                padding: "24px"
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                }}>
                    {/* Currently Staked */}
                    <div style={{
                        background: "rgba(0, 0, 0, 0.2)",
                        borderRadius: "12px",
                        padding: "16px",
                        border: "1px solid rgba(255, 255, 255, 0.05)"
                    }}>
                        <p style={{
                            color: "#888",
                            fontSize: "14px",
                            marginBottom: "4px"
                        }}>Currently Staked</p>
                        <p style={{
                            color: "#fff",
                            fontSize: "24px",
                            fontWeight: "600",
                            margin: 0
                        }}>{getStakedCount()} NFTs</p>
                    </div>

                    {/* Wallet Balance */}
                    <div style={{
                        background: "rgba(0, 0, 0, 0.2)",
                        borderRadius: "12px",
                        padding: "16px",
                        border: "1px solid rgba(255, 255, 255, 0.05)"
                    }}>
                        <p style={{
                            color: "#888",
                            fontSize: "14px",
                            marginBottom: "4px"
                        }}>Wallet Balance</p>
                        <p style={{
                            color: "#fff",
                            fontSize: "24px",
                            fontWeight: "600",
                            margin: 0
                        }}>{walletBalance ? `${Number(walletBalance.displayValue).toFixed(4)} ${walletBalance.symbol}` : "0 AVAX"}</p>
                    </div>

                    {/* Total Rewards */}
                    <div style={{
                        background: "rgba(0, 0, 0, 0.2)",
                        borderRadius: "12px",
                        padding: "16px",
                        border: "1px solid rgba(255, 255, 255, 0.05)"
                    }}>
                        <p style={{
                            color: "#888",
                            fontSize: "14px",
                            marginBottom: "4px"
                        }}>Total Rewards Claimed</p>
                        <p style={{
                            color: "#fff",
                            fontSize: "24px",
                            fontWeight: "600",
                            margin: 0
                        }}>{formatRewards()} AVAX</p>
                    </div>

                    {/* Staking Status */}
                    <div style={{
                        background: "rgba(0, 0, 0, 0.2)",
                        borderRadius: "12px",
                        padding: "16px",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        display: "flex",
                        alignItems: "center",
                        gap: "16px"
                    }}>
                        <div style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            background: "rgba(45, 156, 219, 0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "20px"
                        }}>⚡</div>
                        <div>
                            <p style={{
                                color: "#fff",
                                fontSize: "16px",
                                margin: "0 0 4px 0"
                            }}>Staking Status</p>
                            <p style={{
                                color: "#4CAF50",
                                fontSize: "14px",
                                margin: 0
                            }}>You are currently staking {getStakedCount()} NFT{getStakedCount() !== 1 ? 's' : ''}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
