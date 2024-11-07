'use client';

import React, { useState } from 'react';
import { Web3Button } from "@thirdweb-dev/react";
import { STAKING_CONTRACT } from "../utils/contracts";

interface NFTCardProps {
    nft: any;
    refetch: () => void;
    refecthStakedInfo: () => void;
}

export const NFTCard = ({ nft, refetch, refecthStakedInfo }: NFTCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            style={{
                position: "relative",
                backgroundColor: "rgba(20, 25, 25, 0.7)",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                transition: "all 0.3s ease",
                transform: isHovered ? "translateY(-4px)" : "none",
                boxShadow: isHovered ? "0 8px 24px rgba(0, 0, 0, 0.2)" : "none"
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Gradient Border Effect */}
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, #3A81BF, #41305A)",
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.3s ease"
            }} />

            {/* Image Container */}
            <div style={{
                position: "relative",
                width: "100%",
                paddingBottom: "100%"
            }}>
                <img 
                    src={nft.metadata.image} 
                    alt={nft.metadata.name}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                    }}
                />
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
                    }}>#{nft.metadata.id}</span>
                </div>
            </div>
            
            {/* Content */}
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
                    }}>{nft.metadata.name}</h3>
                    <p style={{
                        color: "#888",
                        fontSize: "14px",
                        margin: 0
                    }}>Available to stake</p>
                </div>

                <Web3Button
                    contractAddress={STAKING_CONTRACT.address}
                    action={async (contract) => {
                        await contract.call(
                            "stake",
                            [[nft.metadata.id]]
                        );
                    }}
                    onSuccess={() => {
                        refetch();
                        refecthStakedInfo();
                    }}
                    style={{
                        width: "100%",
                        backgroundColor: isHovered ? "#2486C0" : "#2D9CDB",
                        color: "#fff",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "none",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease"
                    }}
                >Stake NFT</Web3Button>
            </div>
        </div>
    );
};
