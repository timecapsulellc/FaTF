'use client';

import React from 'react';

interface VideoEmbedProps {
    videoId: string;
    platform?: 'youtube' | 'vimeo';
}

export const VideoEmbed = ({ videoId, platform = 'youtube' }: VideoEmbedProps) => {
    const getEmbedUrl = () => {
        switch (platform) {
            case 'youtube':
                return `https://www.youtube.com/embed/${videoId}`;
            case 'vimeo':
                return `https://player.vimeo.com/video/${videoId}`;
            default:
                return `https://www.youtube.com/embed/${videoId}`;
        }
    };

    return (
        <div style={{
            backgroundColor: "rgba(20, 25, 25, 0.7)",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            marginBottom: "24px"
        }}>
            <div style={{
                padding: "24px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
            }}>
                <h2 style={{
                    fontSize: "24px",
                    fontWeight: "600",
                    color: "#fff",
                    margin: "0 0 16px 0"
                }}>Welcome to Fat Frogs Kingdom</h2>
                <p style={{
                    color: "#888",
                    fontSize: "16px",
                    margin: 0,
                    lineHeight: "1.6"
                }}>
                    Stake your Fat Frogs NFTs and earn AVAX rewards. Join our vibrant community of NFT holders and start earning passive rewards today.
                </p>
            </div>

            <div style={{
                position: "relative",
                width: "100%",
                paddingBottom: "56.25%", // 16:9 aspect ratio
                background: "rgba(0, 0, 0, 0.2)"
            }}>
                <iframe
                    src={getEmbedUrl()}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: "none"
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>

            <div style={{
                padding: "24px",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)"
            }}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "24px"
                }}>
                    <div>
                        <h3 style={{
                            fontSize: "16px",
                            fontWeight: "600",
                            color: "#fff",
                            marginBottom: "8px"
                        }}>🎯 High APY</h3>
                        <p style={{
                            color: "#888",
                            fontSize: "14px",
                            margin: 0,
                            lineHeight: "1.5"
                        }}>Earn competitive AVAX rewards for staking your NFTs</p>
                    </div>
                    <div>
                        <h3 style={{
                            fontSize: "16px",
                            fontWeight: "600",
                            color: "#fff",
                            marginBottom: "8px"
                        }}>🔒 Secure Staking</h3>
                        <p style={{
                            color: "#888",
                            fontSize: "14px",
                            margin: 0,
                            lineHeight: "1.5"
                        }}>Your NFTs remain safely stored in our audited smart contracts</p>
                    </div>
                    <div>
                        <h3 style={{
                            fontSize: "16px",
                            fontWeight: "600",
                            color: "#fff",
                            marginBottom: "8px"
                        }}>⚡ Daily Rewards</h3>
                        <p style={{
                            color: "#888",
                            fontSize: "14px",
                            margin: 0,
                            lineHeight: "1.5"
                        }}>Rewards are distributed daily and can be claimed anytime</p>
                    </div>
                </div>
            </div>

            <div style={{
                padding: "24px",
                background: "linear-gradient(169.44deg, rgba(45, 156, 219, 0.1) 1.85%, rgba(45, 156, 219, 0.05) 98.72%)",
                borderTop: "1px solid rgba(45, 156, 219, 0.2)"
            }}>
                <div style={{
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
                    }}>💡</div>
                    <div>
                        <h3 style={{
                            fontSize: "16px",
                            fontWeight: "600",
                            color: "#fff",
                            marginBottom: "4px"
                        }}>Getting Started</h3>
                        <p style={{
                            color: "#888",
                            fontSize: "14px",
                            margin: 0,
                            lineHeight: "1.5"
                        }}>Connect your wallet, select your NFTs, and start earning rewards immediately</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
