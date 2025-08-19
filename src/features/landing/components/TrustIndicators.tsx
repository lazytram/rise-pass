import Image from "next/image";

export default function TrustIndicators() {
  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 text-white/60 text-sm px-2">
        <div className="flex items-center space-x-3 bg-gradient-to-r from-white/10 to-white/5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full backdrop-blur-xl border border-white/20 w-full sm:w-auto justify-center">
          <span className="text-2xl">🔒</span>
          <span className="font-medium">Soulbound NFT</span>
        </div>
        <div className="flex items-center space-x-3 bg-gradient-to-r from-white/10 to-white/5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 w-full sm:w-auto justify-center">
          <a
            href="https://portal.risechain.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logo-white.svg"
              alt="RISE Logo"
              width={20}
              height={20}
            />
            <span className="font-medium">RISE Testnet</span>
          </a>
        </div>
      </div>
    </div>
  );
}
