import { RoleUpgradeCardProps } from "../types";

export default function RoleUpgradeCard({
  upgradeInfo,
  onUpgradeClick,
}: RoleUpgradeCardProps) {
  const handleUpgradeClick = () => {
    if (onUpgradeClick) {
      onUpgradeClick();
    } else {
      // Default behavior: redirect to mint page
      window.location.href = "/mint";
    }
  };

  return (
    <div className="text-center">
      <div className="inline-flex flex-col items-center px-8 py-6 bg-gradient-to-r from-[#7967e5]/20 to-[#ffa0f2]/20 border border-[#7967e5]/30 rounded-3xl backdrop-blur-sm shadow-xl">
        <div className="flex items-center justify-center mb-4">
          <span className="text-3xl mr-4">🚀</span>
          <div className="text-center">
            <p className="text-white text-xl font-bold">
              Role Upgrade Available!
            </p>
          </div>
        </div>

        <p className="text-white/80 text-base mb-6 text-center max-w-md">
          You&apos;ve been promoted to{" "}
          <strong className="text-white font-semibold">
            {upgradeInfo.highestAvailableRole.name}
          </strong>{" "}
          in Discord
        </p>

        <button
          onClick={handleUpgradeClick}
          className="px-8 py-4 bg-gradient-to-r from-[#7967e5] to-[#ffa0f2] text-white rounded-xl hover:from-[#7967e5]/90 hover:to-[#ffa0f2]/90 transition-all duration-300 text-base font-semibold hover:scale-105 shadow-lg"
        >
          Mint New Passport
        </button>
      </div>
    </div>
  );
}
