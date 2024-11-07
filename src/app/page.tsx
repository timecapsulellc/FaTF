'use client';

import React from 'react';
import { ConnectWallet } from "@thirdweb-dev/react";
import { Staking } from "../../components/Staking";
import { StakingAnalytics } from "../../components/StakingAnalytics";
import { UserProfile } from "../../components/UserProfile";

export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #0F1318 0%, #1A1F25 100%)",
      padding: "24px"
    }}>
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "24px"
      }}>
        {/* Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
          background: "rgba(20, 25, 25, 0.7)",
          borderRadius: "16px",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}>
            <h1 style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#fff",
              margin: 0
            }}>Fat Frogs Kingdom</h1>
            <span style={{
              fontSize: "14px",
              color: "#666",
              fontWeight: "500"
            }}>NFT Staking</span>
          </div>

          <ConnectWallet 
            theme="dark"
            btnTitle="Connect Wallet"
            style={{
              backgroundColor: "#2D9CDB",
              border: "none",
              borderRadius: "8px",
              padding: "12px 20px",
              fontSize: "14px",
              fontWeight: "600"
            }}
          />
        </div>

        {/* Analytics */}
        <StakingAnalytics />

        {/* Main Content */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: "24px",
          alignItems: "start"
        }}>
          {/* Left Column - Staking Interface */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px"
          }}>
            <Staking />
          </div>

          {/* Right Column - Profile & Info */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px"
          }}>
            <UserProfile />
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
                marginBottom: "16px"
              }}>Staking Info</h2>
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                color: "#888",
                fontSize: "14px"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}>
                  <span style={{ color: "#2D9CDB" }}>•</span>
                  <p style={{ margin: 0 }}>Earn AVAX rewards for staking</p>
                </div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}>
                  <span style={{ color: "#2D9CDB" }}>•</span>
                  <p style={{ margin: 0 }}>Minimum staking period: 24 hours</p>
                </div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}>
                  <span style={{ color: "#2D9CDB" }}>•</span>
                  <p style={{ margin: 0 }}>Rewards are distributed daily</p>
                </div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}>
                  <span style={{ color: "#2D9CDB" }}>•</span>
                  <p style={{ margin: 0 }}>No maximum staking limit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
