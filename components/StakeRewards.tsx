'use client';

import React, { useState } from 'react';
import { useAddress, useContract, useContractRead, Web3Button, useBalance } from "@thirdweb-dev/react";
import { STAKING_CONTRACT, REWARD_TOKEN_CONTRACT } from "../utils/contracts";
import { ethers } from "ethers";

export const StakeRewards = () => {
    const address = useAddress();
    const [calculatorDays, setCalculatorDays] = useState("30");
    const [calculatorTokens, setCalculatorTokens] = useState("1");
    
    const { contract: stakingContract } = useContract(STAKING_CONTRACT.address);
    const { data: rewardBalance, refetch: refetchRewardBalance } = useContractRead(
        stakingContract,
        "getStakeInfo",
        [address || ""]
    );

    const { data: walletBalance } = useBalance();
    const { data: rewardRate } = useContractRead(
        stakingContract,
        "getRewardRate"
    );

    const calculateRewards = () => {
        if (!rewardRate) return "0";
        const days = Number(calculatorDays);
        const tokens = Number(calculatorTokens);
        const dailyRate = Number(ethers.utils.formatEther(rewardRate));
        return (dailyRate * days * tokens).toFixed(4);
    };

    return (
        <div style={{
            backgroundColor: "rgba(20, 25, 25, 0.7)",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
            {/* Wallet Balance */}
            <div style={{
                marginBottom: "24px",
                padding: "16px",
                background: "rgba(0, 0, 0, 0.2)",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.05)"
            }}>
                <p style={{
                    color: "#888",
                    fontSize: "14px",
                    marginBottom: "4px"
                }}>Wallet Balance</p>
                <p style={{
                    color: "#fff",
                    fontSize: "20px",
                    fontWeight: "600",
                    margin: 0
                }}>{walletBalance ? `${Number(walletBalance.displayValue).toFixed(4)} ${walletBalance.symbol}` : "0 AVAX"}</p>
            </div>

            {/* Staking Rewards */}
            <div style={{
                marginBottom: "24px",
                padding: "16px",
                background: "rgba(0, 0, 0, 0.2)",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.05)"
            }}>
                <p style={{
                    color: "#888",
                    fontSize: "14px",
                    marginBottom: "4px"
                }}>Available Rewards</p>
                <p style={{
                    color: "#fff",
                    fontSize: "20px",
                    fontWeight: "600",
                    marginBottom: "16px"
                }}>{rewardBalance && rewardBalance[1] ? ethers.utils.formatEther(rewardBalance[1]) : "0"} AVAX</p>
                
                <Web3Button
                    contractAddress={STAKING_CONTRACT.address}
                    action={async (contract) => {
                        await contract.call("claimRewards");
                    }}
                    onSuccess={() => {
                        refetchRewardBalance();
                    }}
                    style={{
                        width: "100%",
                        backgroundColor: "#2D9CDB",
                        color: "#fff",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "none",
                        fontSize: "14px",
                        fontWeight: "600"
                    }}
                >Claim Rewards</Web3Button>
            </div>

            {/* Reward Calculator */}
            <div style={{
                padding: "16px",
                background: "rgba(0, 0, 0, 0.2)",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.05)"
            }}>
                <h3 style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#fff",
                    marginBottom: "16px"
                }}>Reward Calculator</h3>
                
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                }}>
                    <div>
                        <label style={{
                            color: "#888",
                            fontSize: "14px",
                            marginBottom: "8px",
                            display: "block"
                        }}>Number of NFTs</label>
                        <input
                            type="number"
                            value={calculatorTokens}
                            onChange={(e) => setCalculatorTokens(e.target.value)}
                            min="1"
                            style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                background: "rgba(0, 0, 0, 0.2)",
                                color: "#fff",
                                fontSize: "14px"
                            }}
                        />
                    </div>
                    
                    <div>
                        <label style={{
                            color: "#888",
                            fontSize: "14px",
                            marginBottom: "8px",
                            display: "block"
                        }}>Staking Period (Days)</label>
                        <input
                            type="number"
                            value={calculatorDays}
                            onChange={(e) => setCalculatorDays(e.target.value)}
                            min="1"
                            style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                background: "rgba(0, 0, 0, 0.2)",
                                color: "#fff",
                                fontSize: "14px"
                            }}
                        />
                    </div>

                    <div style={{
                        marginTop: "8px",
                        padding: "16px",
                        background: "rgba(45, 156, 219, 0.1)",
                        borderRadius: "8px",
                        border: "1px solid rgba(45, 156, 219, 0.2)"
                    }}>
                        <p style={{
                            color: "#888",
                            fontSize: "14px",
                            marginBottom: "4px"
                        }}>Estimated Rewards</p>
                        <p style={{
                            color: "#fff",
                            fontSize: "20px",
                            fontWeight: "600",
                            margin: 0
                        }}>{calculateRewards()} AVAX</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
