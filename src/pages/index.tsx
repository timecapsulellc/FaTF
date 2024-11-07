import { StakingAnalytics } from '../../components/StakingAnalytics';
import { UserProfile } from '../../components/UserProfile';
import { VideoEmbed } from '../../components/VideoEmbed';
import { Staking } from '../../components/Staking';
import { ConnectWallet } from "@thirdweb-dev/react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f1318] text-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Fat Frogs Kingdom</h1>
            <span className="text-gray-400">NFT Staking</span>
          </div>
          <ConnectWallet />
        </div>

        <div className="mb-8">
          <StakingAnalytics />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Welcome to Fat Frogs Kingdom</h2>
              <p className="text-gray-400">
                Stake your Fat Frogs NFTs and earn AVAX rewards. Join our vibrant
                community of NFT holders and start earning passive rewards today.
              </p>
            </div>
            <VideoEmbed videoId="FatFrog_Kingdom_Anthem_The_Vision_Lives_On" />
          </div>

          <div>
            <UserProfile />
          </div>
        </div>

        <div className="mt-8">
          <Staking />
        </div>
      </div>
    </div>
  );
}
