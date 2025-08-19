import { GradientText } from "../../../shared/components";

export default function HeroTitle() {
  return (
    <div className="space-y-6 text-center">
      <div className="space-y-4">
        <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tight">
          <GradientText>RISE Passport</GradientText>
        </h1>
        <p className="text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed">
          Your digital passport on the fastest blockchain built for speed
        </p>
      </div>

      {/* Decorative elements */}
      <div className="flex justify-center space-x-2 mt-8">
        <div className="w-2 h-2 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-gradient-to-r from-[#ec4899] to-[#f59e0b] rounded-full animate-pulse delay-300"></div>
        <div className="w-2 h-2 bg-gradient-to-r from-[#f59e0b] to-[#ef4444] rounded-full animate-pulse delay-600"></div>
      </div>
    </div>
  );
}
