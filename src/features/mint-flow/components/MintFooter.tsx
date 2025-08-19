"use client";

export default function MintFooter() {
  return (
    <div className="mt-16 space-y-8">
      {/* Features Section */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="text-center space-y-4 p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
          <div className="w-12 h-12 bg-gradient-to-r from-[#7967e5] to-[#ffa0f2] rounded-xl flex items-center justify-center mx-auto">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <div>
            <h4 className="text-white font-semibold text-lg mb-2">
              Secure Identity
            </h4>
            <p className="text-white/70 text-sm leading-relaxed">
              Your digital identity is secured by blockchain technology and
              cryptographic signatures
            </p>
          </div>
        </div>

        <div className="text-center space-y-4 p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
          <div className="w-12 h-12 bg-gradient-to-r from-[#ffa0f2] to-[#ffc393] rounded-xl flex items-center justify-center mx-auto">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div>
            <h4 className="text-white font-semibold text-lg mb-2">
              Instant Access
            </h4>
            <p className="text-white/70 text-sm leading-relaxed">
              Get immediate access to exclusive features and community benefits
            </p>
          </div>
        </div>

        <div className="text-center space-y-4 p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
          <div className="w-12 h-12 bg-gradient-to-r from-[#ffc393] to-[#7967e5] rounded-xl flex items-center justify-center mx-auto">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <div>
            <h4 className="text-white font-semibold text-lg mb-2">
              Community Access
            </h4>
            <p className="text-white/70 text-sm leading-relaxed">
              Join exclusive Discord channels and participate in community
              events
            </p>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="text-center space-y-4">
        <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-6 border border-white/10">
          <h4 className="text-white font-semibold text-lg mb-2">Need Help?</h4>
          <p className="text-white/70 text-sm mb-4">
            If you encounter any issues during the minting process, our support
            team is here to help
          </p>
          <div className="flex items-center justify-center space-x-4">
            <a
              href="https://discord.gg/risechain"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#7967e5] to-[#ffa0f2] text-white rounded-lg hover:scale-105 transition-all duration-300 text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              <span>Join Discord</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
