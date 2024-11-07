'use client';

import React, { useEffect, useState } from 'react';
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { NFT_CONTRACT, STAKING_CONTRACT } from "../utils/contracts";
import { NFTCard } from "./NFTCard";
import { StakedNFTCard } from "./StakedNFTCard";
import { StakeRewards } from "./StakeRewards";
import { VideoEmbed } from "./VideoEmbed";

export const Staking = () => {
    const address = useAddress();
    const [ownedNFTs, setOwnedNFTs] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [sortBy, setSortBy] = useState<"id" | "name">("id");
    const [activeTab, setActiveTab] = useState<"owned" | "staked">("owned");
    
    const { contract: nftContract } = useContract(NFT_CONTRACT.address);
    const { contract: stakingContract } = useContract(STAKING_CONTRACT.address);
    
    const { data: stakedTokens, refetch: refetchStakedTokens } = useContractRead(
        stakingContract,
        "getStakeInfo",
        [address || ""]
    );

    const getOwnedNFTs = async () => {
        if (!nftContract || !address) return;
        
        try {
            const nfts = await nftContract.erc721.getOwned(address);
            setOwnedNFTs(nfts);
        } catch (error) {
            console.error("Failed to get owned NFTs:", error);
        }
    };
    
    useEffect(() => {
        if(address) {
            getOwnedNFTs();
        }
    }, [address]);

    const filteredNFTs = ownedNFTs.filter(nft => 
        nft.metadata.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!address) {
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px"
            }}>
                <VideoEmbed videoId="uPbJPxh92pk" platform="youtube" />
                <div style={{
                    backgroundColor: "rgba(20, 25, 25, 0.7)",
                    borderRadius: "16px",
                    padding: "48px",
                    textAlign: "center",
                    border: "1px solid rgba(255, 255, 255, 0.1)"
                }}>
                    <p style={{
                        color: "#888",
                        fontSize: "16px",
                        marginBottom: "24px"
                    }}>Connect your wallet to view your NFTs and start staking</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            backgroundColor: "rgba(20, 25, 25, 0.7)",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
            {/* Tab Navigation */}
            <div style={{
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                padding: "4px"
            }}>
                <div style={{
                    display: "flex",
                    gap: "4px",
                    padding: "4px",
                    background: "rgba(0, 0, 0, 0.2)",
                    borderRadius: "8px",
                    width: "fit-content"
                }}>
                    <button
                        onClick={() => setActiveTab("owned")}
                        style={{
                            padding: "8px 16px",
                            borderRadius: "6px",
                            border: "none",
                            background: activeTab === "owned" ? "#2D9CDB" : "transparent",
                            color: "#fff",
                            fontSize: "14px",
                            cursor: "pointer",
                            transition: "all 0.2s ease"
                        }}
                    >Owned NFTs</button>
                    <button
                        onClick={() => setActiveTab("staked")}
                        style={{
                            padding: "8px 16px",
                            borderRadius: "6px",
                            border: "none",
                            background: activeTab === "staked" ? "#2D9CDB" : "transparent",
                            color: "#fff",
                            fontSize: "14px",
                            cursor: "pointer",
                            transition: "all 0.2s ease"
                        }}
                    >Staked NFTs</button>
                </div>
            </div>

            {/* Search and Sort Controls */}
            <div style={{
                padding: "16px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                gap: "16px",
                alignItems: "center"
            }}>
                <div style={{
                    position: "relative",
                    flex: 1
                }}>
                    <input
                        type="text"
                        placeholder="Search NFTs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px 16px",
                            paddingLeft: "40px",
                            borderRadius: "8px",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            background: "rgba(0, 0, 0, 0.2)",
                            color: "#fff",
                            fontSize: "14px"
                        }}
                    />
                    <span style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#666",
                        fontSize: "16px"
                    }}>🔍</span>
                </div>

                <div style={{
                    display: "flex",
                    gap: "8px"
                }}>
                    <button
                        onClick={() => setSortBy("id")}
                        style={{
                            padding: "10px 16px",
                            borderRadius: "8px",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            background: sortBy === "id" ? "#2D9CDB" : "rgba(0, 0, 0, 0.2)",
                            color: "#fff",
                            fontSize: "14px",
                            cursor: "pointer",
                            transition: "all 0.2s ease"
                        }}
                    >Sort by ID</button>
                    <button
                        onClick={() => setSortBy("name")}
                        style={{
                            padding: "10px 16px",
                            borderRadius: "8px",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            background: sortBy === "name" ? "#2D9CDB" : "rgba(0, 0, 0, 0.2)",
                            color: "#fff",
                            fontSize: "14px",
                            cursor: "pointer",
                            transition: "all 0.2s ease"
                        }}
                    >Sort by Name</button>
                    <button
                        onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                        style={{
                            padding: "10px",
                            width: "40px",
                            borderRadius: "8px",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            background: "rgba(0, 0, 0, 0.2)",
                            color: "#fff",
                            fontSize: "14px",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        {viewMode === "grid" ? "📋" : "🔲"}
                    </button>
                </div>
            </div>

            {/* NFT Grid */}
            <div style={{
                padding: "24px"
            }}>
                <div style={{
                    display: viewMode === "grid" ? "grid" : "flex",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    flexDirection: viewMode === "list" ? "column" : undefined,
                    gap: "24px"
                }}>
                    {activeTab === "owned" ? (
                        filteredNFTs.length > 0 ? (
                            filteredNFTs
                                .sort((a, b) => {
                                    if (sortBy === "id") {
                                        return Number(a.metadata.id) - Number(b.metadata.id);
                                    }
                                    return a.metadata.name.localeCompare(b.metadata.name);
                                })
                                .map((nft) => (
                                    <NFTCard
                                        key={nft.metadata.id}
                                        nft={nft}
                                        refetch={getOwnedNFTs}
                                        refecthStakedInfo={refetchStakedTokens}
                                    />
                                ))
                        ) : (
                            <div style={{
                                textAlign: "center",
                                padding: "48px",
                                color: "#888",
                                background: "rgba(0, 0, 0, 0.2)",
                                borderRadius: "12px",
                                gridColumn: "1 / -1",
                                border: "1px solid rgba(255, 255, 255, 0.05)"
                            }}>
                                No NFTs found
                            </div>
                        )
                    ) : (
                        stakedTokens && stakedTokens[0]?.length > 0 ? (
                            stakedTokens[0].map((tokenId: any, index: number) => (
                                <StakedNFTCard
                                    key={index}
                                    tokenId={tokenId}
                                    refetchStakedInfo={refetchStakedTokens}
                                    refetchOwnedNFTs={getOwnedNFTs}
                                />
                            ))
                        ) : (
                            <div style={{
                                textAlign: "center",
                                padding: "48px",
                                color: "#888",
                                background: "rgba(0, 0, 0, 0.2)",
                                borderRadius: "12px",
                                gridColumn: "1 / -1",
                                border: "1px solid rgba(255, 255, 255, 0.05)"
                            }}>
                                No staked NFTs
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};
