'use client';

import React from 'react';
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { STAKING_CONTRACT } from "../utils/contracts";

export const StakingAnalytics = () => {
    const { contract: stakingContract } = useContract(STAKING_CONTRACT.address);
    
    const { data: totalStaked } = useContractRead(
        stakingContract,
        "getTotalStaked"
    );

    const { data: stakingRate } = useContractRead(
        stakingContract,
        "getStakingRate"
    );

    const { data: totalSupply } = useContractRead(
        stakingContract,
        "getTotalSupply"
    );

    return (
        <div style={{
            backgroundColor: "rgba(20, 25, 25, 0.7)",
            borderRadius: "16px",
            padding: "24px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
            <h2 style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "#fff",
                marginBottom: "24px"
            }}>Staking Analytics</h2>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px"
            }}>
                <div style={{
                    position: "relative",
                    padding: "24px",
                    borderRadius: "12px",
                    background: "linear-gradient(169.44deg, rgba(58, 129, 191, 0.08) 1.85%, rgba(65, 48, 90, 0.08) 98.72%)",
                    border: "1px solid rgba(58, 129, 191, 0.2)",
                    overflow: "hidden"
                }}>
                    <div style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "4px",
                        height: "100%",
                        background: "linear-gradient(180deg, #3A81BF 0%, #41305A 100%)"
                    }} />
                    <p style={{
                        color: "#888",
                        fontSize: "14px",
                        marginBottom: "8px"
                    }}>Total NFTs Staked</p>
                    <p style={{
                        color: "#fff",
                        fontSize: "32px",
                        fontWeight: "700",
                        margin: 0
                    }}>{totalStaked ? totalStaked.toString() : "0"}</p>
                </div>

                <div style={{
                    position: "relative",
                    padding: "24px",
                    borderRadius: "12px",
                    background: "linear-gradient(169.44deg, rgba(98, 126, 234, 0.08) 1.85%, rgba(65, 48, 90, 0.08) 98.72%)",
                    border: "1px solid rgba(98, 126, 234, 0.2)",
                    overflow: "hidden"
                }}>
                    <div style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "4px",
                        height: "100%",
                        background: "linear-gradient(180deg, #627EEA 0%, #41305A 100%)"
                    }} />
                    <p style={{
                        color: "#888",
                        fontSize: "14px",
                        marginBottom: "8px"
                    }}>Staking Rate</p>
                    <p style={{
                        color: "#fff",
                        fontSize: "32px",
                        fontWeight: "700",
                        margin: 0
                    }}>{stakingRate ? `${(Number(stakingRate) / 100).toFixed(2)}%` : "0%"}</p>
                </div>

                <div style={{
                    position: "relative",
                    padding: "24px",
                    borderRadius: "12px",
                    background: "linear-gradient(169.44deg, rgba(237, 104, 204, 0.08) 1.85%, rgba(65, 48, 90, 0.08) 98.72%)",
                    border: "1px solid rgba(237, 104, 204, 0.2)",
                    overflow: "hidden"
                }}>
                    <div style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "4px",
                        height: "100%",
                        background: "linear-gradient(180deg, #ED68CC 0%, #41305A 100%)"
                    }} />
                    <p style={{
                        color: "#888",
                        fontSize: "14px",
                        marginBottom: "8px"
                    }}>Total Supply</p>
                    <p style={{
                        color: "#fff",
                        fontSize: "32px",
                        fontWeight: "700",
                        margin: 0
                    }}>{totalSupply ? totalSupply.toString() : "0"}</p>
                </div>
            </div>
        </div>
    );
};
