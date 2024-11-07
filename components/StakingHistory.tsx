'use client';

import React from 'react';
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { STAKING_CONTRACT } from "../utils/contracts";
import { ethers } from "ethers";

export const StakingHistory = () => {
    const address = useAddress();
    const { contract: stakingContract } = useContract(STAKING_CONTRACT.address);
    
    const { data: stakingHistory } = useContractRead(
        stakingContract,
        "getStakingHistory",
        [address || ""]
    );

    return (
        <div style={{
            backgroundColor: "rgba(20, 25, 25, 0.7)",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
            <h2 style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#fff",
                marginBottom: "24px"
            }}>Staking History</h2>

            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px"
            }}>
                {stakingHistory && stakingHistory.length > 0 ? (
                    stakingHistory.map((event: any, index: number) => (
                        <div
                            key={index}
                            style={{
                                background: "rgba(0, 0, 0, 0.2)",
                                borderRadius: "12px",
                                padding: "16px",
                                border: "1px solid rgba(255, 255, 255, 0.05)",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}
                        >
                            <div>
                                <p style={{
                                    color: "#fff",
                                    fontSize: "14px",
                                    margin: "0 0 4px 0"
                                }}>{event.action}</p>
                                <p style={{
                                    color: "#888",
                                    fontSize: "12px",
                                    margin: 0
                                }}>Token ID: {event.tokenId.toString()}</p>
                            </div>
                            <div style={{
                                color: "#888",
                                fontSize: "12px",
                                textAlign: "right"
                            }}>
                                {new Date(event.timestamp * 1000).toLocaleDateString()}
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{
                        textAlign: "center",
                        padding: "32px",
                        color: "#888",
                        background: "rgba(0, 0, 0, 0.2)",
                        borderRadius: "12px",
                        border: "1px solid rgba(255, 255, 255, 0.05)"
                    }}>
                        No staking history
                    </div>
                )}
            </div>
        </div>
    );
};
