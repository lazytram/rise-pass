export default function ProcessSteps() {
  return (
    <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-2xl shadow-black/20">
      <div className="text-center mb-8">
        <h3 className="text-white font-bold text-2xl mb-2">How It Works</h3>
        <p className="text-white/70 text-sm">
          Get your RISE Passport in just two simple steps
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="group relative">
          <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-gradient-to-br from-white/15 to-white/8 border border-white/25 hover:border-white/50 transition-all duration-300 hover:scale-105">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] rounded-full flex items-center justify-center shadow-lg shadow-purple-500/40 group-hover:shadow-purple-500/60 transition-all duration-300">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-lg mb-2">
                Connect Discord
              </h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Verify your Discord account and community role from the RISE
                server
              </p>
            </div>
          </div>
        </div>

        <div className="group relative">
          <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-gradient-to-br from-white/15 to-white/8 border border-white/25 hover:border-white/50 transition-all duration-300 hover:scale-105">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-[#ec4899] to-[#f59e0b] rounded-full flex items-center justify-center shadow-lg shadow-pink-500/40 group-hover:shadow-pink-500/60 transition-all duration-300">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#ec4899] to-[#f59e0b] rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-lg mb-2">
                Connect Wallet
              </h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Link your EVM wallet (MetaMask, WalletConnect, etc.) to receive
                your NFT
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center mt-8">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-white/40 rounded-full"></div>
          <div className="w-2 h-2 bg-white/40 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
