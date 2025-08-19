import { GradientText } from "../../../shared/components";

interface MintHeroProps {
  title: string;
  subtitle?: string;
}

export default function MintHero({ title, subtitle }: MintHeroProps) {
  return (
    <div className="text-center space-y-6 mb-12">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-black leading-tight">
          <GradientText>{title}</GradientText>
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="max-w-4xl mx-auto">
        <p className="text-lg text-white/70 leading-relaxed">
          Connect your Discord account to verify your community role, then link
          your EVM wallet to mint your personalized RISE Passport NFT. Your
          Discord role becomes a permanent, verifiable digital identity on the
          blockchain.
        </p>
      </div>

      {/* Trust indicators */}
      <div className="flex justify-center items-center space-x-8 text-white/50 text-sm">
        <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
          <span className="text-[#7967e5]">🔒</span>
          <span>Soulbound NFT</span>
        </div>
        <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
          <span className="text-[#ffa0f2]">⚡</span>
          <span>Instant Verification</span>
        </div>
        <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
          <span className="text-[#ffc393]">🎨</span>
          <span>Dynamic Design</span>
        </div>
      </div>
    </div>
  );
}
