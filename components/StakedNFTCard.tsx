'use client';

import React, { useState } from 'react';
import { useContract, useContractRead, Web3Button } from "@thirdweb-dev/react";
import { NFT_CONTRACT, STAKING_CONTRACT } from "../utils/contracts";

interface StakedNFTCardProps {
    tokenId: string;
    refetchStakedInfo: () => void;
    refetchOwnedNFTs: () => void;
}

export const StakedNFTCard = ({ tokenId, refetchStakedInfo, refetchOwnedNFTs }: StakedNFTCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const { contract: nftContract } = useContract(NFT_CONTRACT.address);
    
    const { data: tokenURI } = useContractRead(
        nftContract,
        "tokenURI",
        [tokenId]
    );

    const { data: stakingInfo } = useContractRead(
        nftContract,
        "getStakingInfo",
        [tokenId]
    );

    const formatDuration = (startTime: number) => {
        const now = Math.floor(Date.now() / 1000);
        const duration = now - startTime;
        const days = Math.floor(duration / (24 * 60 * 60));
        const hours = Math.floor((duration % (24 * 60 * 60)) / (60 * 60));
        return `${days}d ${hours}h`;
    };

    return (
        <div 
            style={{
                backgroundColor: "rgba(20, 25, 25, 0.7)",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                transition: "transform 0.2s ease",
                transform: isHovered ? "translateY(-4px)" : "none"
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={{
                position: "relative",
                width: "100%",
                paddingBottom: "100%"
            }}>
                {tokenURI && (
                    <img 
                        src={tokenURI}
                        alt={`NFT ${tokenId}`}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                        }}
                    />
                )}
                <div style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: "rgba(0, 0, 0, 0.5)",
                    padding: "6px 12px",
                    borderRadius: "16px",
                    backdropFilter: "blur(4px)"
                }}>
                    <span style={{
                        color: "#fff",
                        fontSize: "12px",
                        fontWeight: "500"
                    }}>
                        {stakingInfo && formatDuration(Number(stakingInfo.startTime))}
                    </span>
                </div>
            </div>
            
            <div style={{
                padding: "16px",
                background: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(10px)"
            }}>
                <div style={{
                    marginBottom: "16px"
                }}>
                    <h3 style={{ 
                        fontSize: "18px", 
                        color: "#fff",
                        margin: "0 0 4px 0",
                        fontWeight: "600"
                    }}>Frog #{tokenId}</h3>
                    <p style={{
                        color: "#888",
                        fontSize: "14px",
                        margin: 0
                    }}>Staked</p>
                </div>

                <Web3Button
                    contractAddress={STAKING_CONTRACT.address}
                    action={async (contract) => {
                        await contract.call(
                            "withdraw",
                            [[tokenId]]
                        );
                    }}
                    onSuccess={() => {
                        refetchStakedInfo();
                        refetchOwnedNFTs();
                    }}
                    style={{
                        width: "100%",
                        backgroundColor: "#2D9CDB",
                        color: "#fff",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "none",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "background-color 0.2s ease"
                    }}
                >Withdraw NFT</Web3Button>
            </div>
        </div>
    );
};
